/*
  performance-monitor.js
  ---------------------------------
  Simple Performance Dashboard using PerformanceObserver
  Shows:
  - LCP (Largest Contentful Paint)
  - CLS (Cumulative Layout Shift)
  - FID / INP (Interaction Delay)
  - Navigation Timing
  - Resource Loading

  Usage:
  1. Include this file in your HTML
  2. Open DevTools Console
  3. Reload page
*/

class PerformanceMonitor {
  constructor() {
    this.clsValue = 0;
    this.resources = [];

    this.init();
  }

  init() {
    console.clear();
    console.log("🚀 Performance Monitor Started...");

    this.observeLCP();
    this.observeCLS();
    this.observeINP();
    this.observeNavigation();
    this.observeResources();

    window.addEventListener("load", () => {
      setTimeout(() => this.printSummary(), 1000);
    });
  }

  /* ===============================
     LCP (Largest Contentful Paint)
  =============================== */
  observeLCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];

      console.log("🟢 LCP:", this.formatTime(last.startTime));
    });

    observer.observe({
      type: "largest-contentful-paint",
      buffered: true,
    });
  }

  /* ===============================
     CLS (Layout Shift)
  =============================== */
  observeCLS() {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (!entry.hadRecentInput) {
          this.clsValue += entry.value;
        }
      });
    });

    observer.observe({
      type: "layout-shift",
      buffered: true,
    });
  }

  /* ===============================
     INP / FID (Interaction Delay)
  =============================== */
  observeINP() {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        const delay = entry.processingStart - entry.startTime;

        console.log(
          "🟡 Interaction Delay:",
          this.formatTime(delay),
          `(${entry.name})`
        );
      });
    });

    observer.observe({
      type: "event",
      buffered: true,
      durationThreshold: 40,
    });
  }

  /* ===============================
     Navigation Timing
  =============================== */
  observeNavigation() {
    const observer = new PerformanceObserver((list) => {
      const nav = list.getEntries()[0];

      this.navigationData = {
        dns: nav.domainLookupEnd - nav.domainLookupStart,
        tcp: nav.connectEnd - nav.connectStart,
        ttfb: nav.responseStart - nav.requestStart,
        download: nav.responseEnd - nav.responseStart,
        dom: nav.domComplete - nav.domInteractive,
        load: nav.loadEventEnd - nav.startTime,
      };
    });

    observer.observe({
      type: "navigation",
      buffered: true,
    });
  }

  /* ===============================
     Resource Timing
  =============================== */
  observeResources() {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        this.resources.push({
          name: entry.name,
          time: entry.duration,
          size: entry.transferSize || 0,
          type: entry.initiatorType,
        });
      });
    });

    observer.observe({
      type: "resource",
      buffered: true,
    });
  }

  /* ===============================
     Summary Report
  =============================== */
  printSummary() {
    console.group("📊 Performance Summary");

    console.log("\n🧩 Layout Shift (CLS):", this.clsValue.toFixed(3));

    if (this.navigationData) {
      console.log("\n🌐 Navigation Timing (ms)");
      console.table({
        "DNS Lookup": this.formatNum(this.navigationData.dns),
        "TCP Connect": this.formatNum(this.navigationData.tcp),
        "TTFB": this.formatNum(this.navigationData.ttfb),
        "Response Download": this.formatNum(this.navigationData.download),
        "DOM Processing": this.formatNum(this.navigationData.dom),
        "Total Load": this.formatNum(this.navigationData.load),
      });
    }

    this.printHeavyResources();

    this.printScore();

    console.groupEnd();
  }

  /* ===============================
     Heavy Resources
  =============================== */
  printHeavyResources() {
    const heavy = this.resources
      .filter((r) => r.time > 300)
      .sort((a, b) => b.time - a.time)
      .slice(0, 5);

    if (!heavy.length) return;

    console.log("\n📦 Slow Resources (>300ms)");

    console.table(
      heavy.map((r) => ({
        File: r.name.split("/").pop(),
        Type: r.type,
        "Load (ms)": this.formatNum(r.time),
        "Size (KB)": (r.size / 1024).toFixed(1),
      }))
    );
  }

  /* ===============================
     Simple Performance Score
  =============================== */
  printScore() {
    let score = 100;

    if (this.clsValue > 0.25) score -= 25;
    else if (this.clsValue > 0.1) score -= 10;

    if (this.navigationData?.ttfb > 600) score -= 20;
    else if (this.navigationData?.ttfb > 300) score -= 10;

    if (this.navigationData?.load > 4000) score -= 20;
    else if (this.navigationData?.load > 2500) score -= 10;

    score = Math.max(0, score);

    console.log("\n🏆 Performance Score:", score + "/100");

    if (score >= 85) console.log("✅ Excellent");
    else if (score >= 70) console.log("⚠️ Good");
    else console.log("❌ Needs Optimization");
  }

  /* ===============================
     Helpers
  =============================== */
  formatTime(ms) {
    return (ms / 1000).toFixed(2) + "s";
  }

  formatNum(ms) {
    return Number(ms.toFixed(1));
  }
}

// Auto Start
new PerformanceMonitor();