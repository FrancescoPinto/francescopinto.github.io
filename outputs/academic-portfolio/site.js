// Lightweight neural-network background: decorative only, never interactive or content-bearing.
const networkCanvas = document.createElement("canvas");
networkCanvas.className = "neural-network-bg";
networkCanvas.setAttribute("aria-hidden", "true");
document.body.prepend(networkCanvas);
const networkContext = networkCanvas.getContext("2d");
const networkStyle = document.createElement("style");
networkStyle.textContent = "body{isolation:isolate}body::before{content:' ';position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.16;background-image:radial-gradient(circle at 12% 18%,rgba(182,83,61,.6) 0 2px,transparent 3px),radial-gradient(circle at 78% 32%,rgba(22,43,56,.5) 0 2px,transparent 3px),radial-gradient(circle at 48% 82%,rgba(182,83,61,.45) 0 2px,transparent 3px);background-size:170px 150px,230px 210px,190px 180px;animation:networkDrift 22s ease-in-out infinite alternate}@keyframes networkDrift{to{background-position:35px -20px,-45px 30px,25px 18px}}.neural-network-bg{position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:.62;mix-blend-mode:multiply}.site-header,main,footer{position:relative;z-index:1}@media(prefers-reduced-motion:reduce){body::before{animation:none}}";
document.head.append(networkStyle);
let networkWidth = 0, networkHeight = 0, networkNodes = [], networkPointer = { x: -1000, y: -1000, active: false };
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function resizeNetwork() {
  const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
  networkWidth = window.innerWidth; networkHeight = window.innerHeight;
  networkCanvas.width = networkWidth * ratio; networkCanvas.height = networkHeight * ratio;
  networkContext.setTransform(ratio, 0, 0, ratio, 0, 0);
  const count = Math.min(72, Math.max(28, Math.floor(networkWidth / 22)));
  networkNodes = Array.from({ length: count }, (_, i) => ({ x: (i * 97) % networkWidth, y: (i * 53) % networkHeight, vx: (i % 2 ? 1 : -1) * (0.06 + (i % 4) * 0.018), vy: (i % 3 ? 1 : -1) * 0.045 }));
}
function drawNetwork() {
  networkContext.clearRect(0, 0, networkWidth, networkHeight);
  networkNodes.forEach((a, i) => networkNodes.slice(i + 1).forEach((b) => {
    const distance = Math.hypot(a.x - b.x, a.y - b.y);
    if (distance < 190) { networkContext.strokeStyle = `rgba(22,43,56,${(1 - distance / 190) * .48})`; networkContext.lineWidth = .9; networkContext.beginPath(); networkContext.moveTo(a.x, a.y); networkContext.lineTo(b.x, b.y); networkContext.stroke(); }
  }));
  networkNodes.forEach((node) => { const nearPointer = networkPointer.active && Math.hypot(node.x - networkPointer.x, node.y - networkPointer.y) < 175; networkContext.fillStyle = nearPointer ? "rgba(182,83,61,.95)" : "rgba(182,83,61,.72)"; networkContext.beginPath(); networkContext.arc(node.x, node.y, nearPointer ? 3.3 : 2.35, 0, Math.PI * 2); networkContext.fill(); if (nearPointer) { networkContext.strokeStyle = "rgba(182,83,61,.46)"; networkContext.lineWidth = 1; networkContext.beginPath(); networkContext.moveTo(node.x, node.y); networkContext.lineTo(networkPointer.x, networkPointer.y); networkContext.stroke(); } if (!reducedMotion) { node.x = (node.x + node.vx + networkWidth) % networkWidth; node.y = (node.y + node.vy + networkHeight) % networkHeight; } });
  if (networkPointer.active) { networkContext.strokeStyle = "rgba(182,83,61,.42)"; networkContext.lineWidth = 1; networkContext.beginPath(); networkContext.arc(networkPointer.x, networkPointer.y, 18 + Math.sin(performance.now() / 260) * 3, 0, Math.PI * 2); networkContext.stroke(); }
  if (!reducedMotion && !document.hidden) requestAnimationFrame(drawNetwork);
}
resizeNetwork(); window.addEventListener("resize", resizeNetwork, { passive: true }); drawNetwork();
window.addEventListener("pointermove", (event) => { networkPointer = { x: event.clientX, y: event.clientY, active: true }; }, { passive: true });
window.addEventListener("pointerleave", () => { networkPointer.active = false; }, { passive: true });
document.addEventListener("visibilitychange", () => { if (!document.hidden && !reducedMotion) requestAnimationFrame(drawNetwork); }, { passive: true });

const themes = [
  { n: "01", t: "Safe AI agents", plain: "How can AI agents use tools, follow instructions, and work over long tasks without being manipulated or causing harm?", academic: "Security and safety evaluation for agents, automatic red teaming, and practical guardrails for deployment.", papers: [
    ["AutoRedTeamer: Autonomous Red Teaming with Lifelong Attack Integration", "NeurIPS 2025", "https://arxiv.org/pdf/2503.15754"],
    ["SafeWatch: An Efficient Safety-Policy Following Video Guardrail Model with Transparent Explanations", "ICLR 2025", "https://arxiv.org/pdf/2412.06878"],
    ["Focus On This, Not That! Steering LLMs With Adaptive Feature Specification", "ICML 2025", "https://arxiv.org/pdf/2410.22944"],
    ["Do Role-Playing Agents Practice What They Preach?", "ICLR 2024", "https://arxiv.org/pdf/2507.02197"]
  ]},
  { n: "02", t: "Trustworthy multimodal AI", plain: "How do we evaluate systems that see, read, and reason about the world - and know when not to trust them?", academic: "Trustworthiness evaluation for video and vision-language foundation models, including safety, privacy, fairness, hallucination, and robustness.", papers: [
    ["VMDT: Decoding the Trustworthiness of Video Foundation Models", "NeurIPS 2025", "https://arxiv.org/pdf/2511.05682"],
    ["MMDT: Decoding the Trustworthiness and Safety of Multimodal Foundation Models", "ICLR 2025", "https://arxiv.org/pdf/2503.14827"],
    ["LikePhys: Evaluating Intuitive Physics Understanding in Video Diffusion Models via Likelihood Preference", "ICLR 2026", "https://arxiv.org/pdf/2510.11512"],
    ["Hidden in Plain Sight: Evaluating Abstract Shape Recognition Ability of Vision-Language Models", "NeurIPS 2024", "https://arxiv.org/pdf/2411.06287"]
  ]},
  { n: "03", t: "Reliable learning foundations", plain: "What makes a model robust, private, and honest about uncertainty when data or conditions shift?", academic: "Privacy-preserving learning, data memorization, calibration, adversarial robustness, and intervention-aware data augmentation.", papers: [
    ["Extracting Training Data from Document-Based VQA Models", "ICML 2024", "https://arxiv.org/pdf/2407.08707"],
    ["Strong Copyright Protection for Language Models via Adaptive Model Fusion", "ICML 2024 workshop", "https://arxiv.org/pdf/2407.20105"],
    ["Towards Certification of Uncertainty Calibration under Adversarial Attacks", "ICLR 2025", "https://arxiv.org/pdf/2405.13922"],
    ["As Firm As Their Foundations: Can Open-Sourced Foundation Models Be Used to Create Adversarial Examples for Downstream Tasks?", "BMVC 2024", "https://arxiv.org/pdf/2403.12693"],
    ["PILLAR: How to Make Semi-Private Learning More Effective", "SatML 2024", "https://arxiv.org/pdf/2306.03962"],
    ["RegMixup: Mixup as a Regularizer Can Surprisingly Improve Accuracy and Out Distribution Robustness", "NeurIPS 2022", "https://arxiv.org/pdf/2206.14502"],
    ["Not Just Pretty Pictures: Toward Interventional Data Augmentation Using Text-to-Image Generators", "ICML 2024", "https://arxiv.org/pdf/2212.11237"],
    ["An Impartial Take to the CNN vs Transformer Robustness Contest", "ECCV 2022", "https://arxiv.org/pdf/2207.11347"]
  ]}
];

const recent = [
  ["2026", "LikePhys: Evaluating Intuitive Physics Understanding in Video Diffusion Models via Likelihood Preference", "ICLR 2026", "https://arxiv.org/pdf/2510.11512"],
  ["2025", "AutoRedTeamer: Autonomous Red Teaming with Lifelong Attack Integration", "NeurIPS 2025", "https://arxiv.org/pdf/2503.15754"],
  ["2025", "VMDT: Decoding the Trustworthiness of Video Foundation Models", "NeurIPS 2025", "https://arxiv.org/pdf/2511.05682"],
  ["2025", "SafeWatch: An Efficient Safety-Policy Following Video Guardrail Model with Transparent Explanations", "ICLR 2025", "https://arxiv.org/pdf/2412.06878"],
  ["2025", "Focus On This, Not That! Steering LLMs With Adaptive Feature Specification", "ICML 2025", "https://arxiv.org/pdf/2410.22944"]
];
function paperSummary(title) {
  if (/AutoRedTeamer/i.test(title)) return "An autonomous red-teaming framework that continually discovers and integrates new attacks. It helps stress-test agentic systems before deployment. Useful for scalable, evolving safety evaluation.";
  if (/SafeWatch/i.test(title)) return "A video guardrail model designed to follow safety policies and explain its decisions. It targets practical moderation for multimodal systems. Useful when safety checks must be transparent and efficient.";
  if (/Focus On This/i.test(title)) return "A method for steering language models toward specified features while suppressing spurious cues. It improves controllability, robustness, and fairness under distribution shift. Useful for more reliable instruction tuning.";
  if (/Role-Playing Agents/i.test(title)) return "An evaluation of whether role-playing agents' stated beliefs predict their simulated behaviour. It exposes gaps between what agents say and how they act. Useful for auditing behavioural reliability in agent simulations.";
  if (/VMDT/i.test(title)) return "A benchmark for decoding the trustworthiness of video foundation models. It examines safety, robustness, hallucination, and related failure modes. Useful for choosing video models that can be deployed responsibly.";
  if (/MMDT/i.test(title)) return "A systematic evaluation of trustworthiness and safety in multimodal foundation models. It brings multiple risk dimensions into a common testing framework. Useful for comparing models beyond accuracy alone.";
  if (/LikePhys/i.test(title)) return "A likelihood-based test of intuitive physics in video diffusion models. It measures whether generated dynamics remain physically plausible. Useful for evaluating generative models that interact with the physical world.";
  if (/Hidden in Plain Sight/i.test(title)) return "A study of whether vision-language models actually use abstract visual representations. It reveals when language priors substitute for visual reasoning. Useful for designing sharper multimodal evaluations.";
  if (/Strong Copyright/i.test(title)) return "An adaptive model-fusion approach for strengthening copyright protection in language models. It explores how models can reduce memorization and unauthorized reproduction. Useful for privacy- and rights-aware model development.";
  if (/Calibration/i.test(title)) return "A framework for certifying uncertainty calibration under adversarial perturbations. It derives worst-case guarantees for confidence quality. Useful when model probabilities must remain meaningful under attack.";
  if (/As Firm/i.test(title)) return "An investigation of transferring adversarial attacks from foundation models to downstream tasks. It shows how open models can expose inherited vulnerabilities. Useful for assessing robustness before reuse or adaptation.";
  if (/PILLAR/i.test(title)) return "A practical method for making semi-private learning effective in low-data settings. It balances privacy constraints with predictive utility. Useful for training models when sensitive data cannot be fully centralized.";
  if (/RegMixup/i.test(title)) return "A regularization method that combines mixup with a distribution-aware training objective. It can improve accuracy and out-of-distribution robustness. Useful as a lightweight reliability improvement for classifiers.";
  if (/Pretty Pictures/i.test(title)) return "A study of intervention-aware data augmentation with text-to-image generators. It asks whether synthetic images improve causal robustness rather than appearance alone. Useful for building stronger datasets and evaluations.";
  if (/Impartial Take/i.test(title)) return "A careful comparison of CNN and Transformer robustness under matched conditions. It separates architectural effects from confounding experimental choices. Useful for making fair claims about model reliability.";
  return "A peer-reviewed contribution to trustworthy machine learning and dependable AI systems. It develops evidence, methods, or evaluations for understanding model behaviour. Useful for researchers and practitioners building safer deployments.";
}

const affiliationLogos = [
  ["Google DeepMind", "https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/deepmind.svg"], ["Meta", "https://cdn.simpleicons.org/meta/162b38"], ["Google", "https://cdn.simpleicons.org/google/162b38"],
  ["University of Oxford", "https://www.google.com/s2/favicons?domain=ox.ac.uk&sz=128"], ["University of Chicago", "https://www.google.com/s2/favicons?domain=uchicago.edu&sz=128"], ["ETH Zurich", "https://www.google.com/s2/favicons?domain=ethz.ch&sz=128"],
  ["Politecnico di Milano", "https://www.google.com/s2/favicons?domain=polimi.it&sz=128"], ["FiveAI / Bosch", "https://cdn.simpleicons.org/bosch/162b38"], ["Frontier Development Lab", "https://www.google.com/s2/favicons?domain=esa.int&sz=128"]
];
document.querySelectorAll(".site-header nav").forEach((nav) => {
  const atlasLink = [...nav.querySelectorAll("a")].find((link) => link.getAttribute("href")?.endsWith("research.html"));
  if (atlasLink) {
    atlasLink.textContent = "Research";
    [...nav.querySelectorAll("a")].filter((link) => link !== atlasLink && link.getAttribute("href")?.includes("#research")).forEach((link) => link.remove());
  }
});
const affiliationLabel = document.querySelector(".affiliations .eyebrow");
const affiliationGrid = document.querySelector(".affiliations div");
if (affiliationLabel) affiliationLabel.textContent = "Current and past affiliations";
if (affiliationGrid) {
  affiliationGrid.innerHTML = affiliationLogos.map(([name, logo]) => `<span class="affiliation-logo"><img src="${logo}" alt="" aria-hidden="true" onerror="this.style.display='none'"><b>${name}</b></span>`).join("");
  affiliationGrid.innerHTML += affiliationGrid.innerHTML;
  affiliationGrid.classList.add("affiliation-track");
  const style = document.createElement("style");
  style.textContent = ".affiliations{overflow:hidden}.affiliations div{align-items:center}.affiliation-track{flex-wrap:nowrap!important;width:max-content;animation:affiliationScroll 32s linear infinite}.affiliation-logo{display:inline-flex;align-items:center;gap:10px!important;flex:none}.affiliation-logo::after{content:none!important}.affiliation-logo img{width:25px;height:25px;object-fit:contain}.affiliation-logo b{font:500 clamp(.95rem,1.7vw,1.25rem) var(--serif);letter-spacing:-.02em}@keyframes affiliationScroll{from{transform:translateX(0)}to{transform:translateX(-38%)}}@media(prefers-reduced-motion:reduce){.affiliation-track{animation:none}}";
  document.head.append(style);
}

document.querySelectorAll(".site-header nav a").forEach((link) => { if (link.textContent.includes("& CV")) link.textContent = "About"; });
document.querySelectorAll(".about-hero .eyebrow").forEach((label) => { label.textContent = "Biography"; });
if (document.title.includes("& CV")) document.title = document.title.replace(" & CV", "");
document.querySelector(".hero-actions .button")?.remove();
document.querySelector(".about-cta")?.remove();

const journeyLogos = { "DeepMind":"https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/deepmind.svg", "University of Chicago":"https://www.google.com/s2/favicons?domain=uchicago.edu&sz=128", "Meta":"https://cdn.simpleicons.org/meta/162b38", "Google":"https://cdn.simpleicons.org/google/162b38", "ETH Zurich":"https://www.google.com/s2/favicons?domain=ethz.ch&sz=128", "FiveAI / Bosch":"https://cdn.simpleicons.org/bosch/162b38", "Frontier Development Lab":"https://www.google.com/s2/favicons?domain=esa.int&sz=128", "University of Oxford":"https://www.google.com/s2/favicons?domain=ox.ac.uk&sz=128", "Politecnico di Milano":"https://www.google.com/s2/favicons?domain=polimi.it&sz=128" };
document.querySelectorAll(".journey li h2").forEach((heading) => { const logo = journeyLogos[heading.textContent.trim()]; if (logo) { const img = document.createElement("img"); img.src = logo; img.alt = ""; img.className = "journey-logo"; heading.parentElement.prepend(img); } });
const cards = document.querySelector("#research-notes");
if (cards) themes.forEach((item) => cards.insertAdjacentHTML("beforeend", `<article class="theme-card"><span>${item.n}</span><h3>${item.t}</h3><p>${item.plain}</p></article>`));

const list = document.querySelector("#publication-list");
if (list) recent.forEach((paper) => list.insertAdjacentHTML("beforeend", `<li><span class="publication-year">${paper[0]}</span><div><h3>${paper[1]}</h3><p>${paper[2]}</p></div><a href="${paper[3]}" target="_blank" rel="noreferrer" aria-label="Read PDF on arXiv">PDF</a></li>`));

const atlas = document.querySelector("#research-atlas");
if (atlas) themes.forEach((item) => atlas.insertAdjacentHTML("beforeend", `<section class="atlas-theme"><div class="atlas-number">${item.n}</div><div><p class="eyebrow">${item.t}</p><h2>${item.plain}</h2><p class="academic-note"><strong>Academic lens.</strong> ${item.academic}</p><div class="paper-group"><p class="eyebrow">Selected papers</p><ul>${item.papers.map((paper) => `<li><a href="${paper[2]}" target="_blank" rel="noreferrer" aria-label="Read ${paper[0]} PDF on arXiv"><span>${paper[0]}<small>${paper[1]} · arXiv PDF</small><em class="paper-summary">${paperSummary(paper[0])}</em></span><b>PDF</b></a></li>`).join("")}</ul></div></div></section>`));
if (atlas) { const multimodal = atlas.querySelectorAll(".atlas-theme")[1]; if (multimodal) multimodal.querySelector(".academic-note")?.insertAdjacentHTML("afterend", `<p class="direction-note"><strong>Current direction — GeoPhys.</strong> Geometry-aware evaluation of physical plausibility in generative and multimodal models.</p>`); }
