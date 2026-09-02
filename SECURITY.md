# Security & Privacy Policy

## 🔒 Threat Model & Architecture

**Aku Desil 10** is designed around the principle of **Zero Trust & Privacy by Absence**:

1. **Zero Outbound Telemetry**:
   - The application contains **0 network requests (`fetch`, `XMLHttpRequest`, WebSockets, beacons)**.
   - All calculations run 100% client-side in the browser's volatile memory (RAM).
2. **Zero Persistent Storage**:
   - No cookies are written.
   - No `localStorage` or `sessionStorage` keys are created or accessed.
   - Closing the browser tab immediately purges all input data from memory via standard browser garbage collection.
3. **Zero Identifiable Data (PII)**:
   - The application does not collect, accept, or process names, National Identity Numbers (NIK), phone numbers, or email addresses.
4. **Self-Contained Dependency Graph**:
   - Pure Vanilla JavaScript, HTML5, and CSS.
   - Zero third-party scripts, external fonts, or remote CDN dependencies.

---

## 🛡️ Reporting a Vulnerability

If you discover a security vulnerability, please open an issue in this repository or contact the maintainers with:
- Description of the vulnerability.
- Steps to reproduce.
- Potential impact.
