# Brochure Content Outline

## Title
**Mechanistic Interpretability of Code Correctness in LLMs via Sparse Autoencoders**

---

## Panel Layout (Tri-fold)

When folded, user sees: **Panel 6 (Front Cover)**
When opened: **Panels 1-2-3 (Inside)**
When flipped: **Panels 4-5-6 (Back)**

---

## Panel 6: Front Cover

**Title:** Mechanistic Interpretability of Code Correctness in LLMs

**Subtitle:** via Sparse Autoencoders

**Visual:** TBD (code + brain icon? or simple abstract)

**Author:** Kriz Tahimic

**Adviser:** Dr. Charibeth K. Cheng

**Institution:** College of Computer Studies, De La Salle University

**Year:** Academic Year 2024-2025

---

## Panel 1: Context & Problem (Inside Left)

### Context
- 30% of AI-suggested code from GitHub Copilot enters production (Dohmke et al., 2023)
- Projected $1.5T GDP impact by 2030
- LLMs increasingly used for code generation

### The Problem
- We lack mechanistic understanding of WHEN and WHY models produce correct code
- Models fail in bug-prone contexts (12.27% accuracy, Guo et al., 2025)
- 44% of LLM bugs are identical to historical training bugs

### Stakes
- Critical for high-risk domains:
  - Healthcare
  - Banking
  - Military

### Figure 1: Polysemantic Neuron
- Shows one neuron responding to unrelated concepts
- Source: `Thesis2/.../figures/polysemantic neuron.png`

---

## Panel 2: The Challenge & Approach (Inside Center)

### Why Interpretation is Hard
- **Superposition**: Neural networks compress more features than dimensions
- **Polysemantic neurons**: Single neurons respond to multiple unrelated concepts
- Cannot isolate specific mechanisms from entangled representations

### Figure 2: Superposition
- Shows feature compression concept
- Source: `Thesis3/iclr2026/figures/superposition.png` or `Thesis2/.../figures/superposition.png`

### Our Approach
- **Sparse Autoencoders (SAEs)**: Decompose representations into interpretable directions
- Based on Linear Representation Hypothesis
- Uses GemmaScope pre-trained SAEs

### Technical Details
- **Model:** Gemma-2 2B
- **Dataset:** MBPP (1,000 Python problems)
- **Analysis:** Residual stream at final prompt token

---

## Panel 3: Key Insight (Inside Right)

### Main Finding
**Code correctness directions EXIST in LLM representations and are actionable**

### 1. Predict Errors Before Generation
- **Incorrect-predicting direction** detects errors
- F1: 0.821 for error detection
- Can serve as "error alarm" for developer review

### 2. Steer Toward Correctness
- **Correct-steering direction** can fix errors
- Fixes 4.04% of errors
- Tradeoff: affects some correct code (selective steering needed)

### 3. Asymmetric Finding
- Found: **incorrect-predicting** + **correct-steering**
- Did NOT find strong: correct-predicting or incorrect-steering
- Models detect "wrongness" differently than they encode "correctness"

### Figure 3: Prediction Results
- Shows F1 0.821 for incorrect-predicting
- Source: `Thesis3/iclr2026/figures/incorrect-predicting.png`

---

## Panel 4: Mechanistic Findings (Back Center)

### Supporting Analyses

**1. Prediction (Detection)**
- Incorrect-predicting direction: F1 = 0.821
- Correct-predicting direction: F1 = 0.504 (weak)
- Asymmetry: models better at detecting errors than confirming correctness

**2. Steering (Intervention)**
- Correct-steering: Fixes 4.04% of errors
- Tradeoff: Corrupts 14.66% of correct code
- Implication: Use selective steering, not constant

**3. Attention Analysis**
- Test cases matter MORE than problem descriptions
- Correct-steering increases test attention (+14.60)
- Incorrect-steering suppresses test attention (-12.69)

### Figure 4: Attention Delta
- Shows attention changes with steering
- Source: `Thesis3/iclr2026/figures/attention_delta_plots.png`

**4. Necessity (Weight Orthogonalization)**
- Removing correct directions: 83.62% code corruption
- Control: only 18.97% corruption
- Proves directions are causally necessary

**5. Persistence (Base → Instruction-tuned)**
- Directions transfer from base Gemma-2 to chat variant
- F1: 0.821 → 0.772 for error detection
- Mechanisms learned in pre-training are repurposed

---

## Panel 5: Significance & Contact (Back Right)

### Significance

**First Application**
- First use of SAEs to study code correctness mechanisms in LLMs

**Practical Applications**
1. **Prompting strategies**: Prioritize test examples over problem descriptions
2. **Error alarms**: Predictor directions flag code for developer review
3. **Selective steering**: Intervene only when errors are anticipated

**Safety Implications**
- Contributes to safer AI deployment in critical sectors
- Mechanistic understanding enables better monitoring

### Key References
- Ferrando et al. (2024) - Entity recognition via SAEs
- Bricken et al. (2023) - Towards Monosemanticity
- Lieberum et al. (2024) - GemmaScope
- Templeton et al. (2024) - Scaling Monosemanticity

### Contact

**Proponent:**
Kriz Tahimic
kriz_tahimic@dlsu.edu.ph

**Adviser:**
Dr. Charibeth K. Cheng
charibeth.cheng@dlsu.edu.ph

**Institution:**
College of Computer Studies
De La Salle University
Manila, Philippines

BS Computer Science
Major in Software Technology

---

## Figures Summary

| Panel | Figure | Source |
|-------|--------|--------|
| 1 | Polysemantic Neuron | `Thesis2/.../figures/polysemantic neuron.png` |
| 2 | Superposition | `Thesis3/iclr2026/figures/superposition.png` |
| 3 | Incorrect-Predicting Results | `Thesis3/iclr2026/figures/incorrect-predicting.png` |
| 4 | Attention Delta | `Thesis3/iclr2026/figures/attention_delta_plots.png` |

---

## Notes for Final Version

- [ ] Verify all figures fit in allocated space
- [ ] Adjust font sizes if needed
- [ ] Consider abbreviating some sections if too dense
- [ ] Test print to ensure readability
