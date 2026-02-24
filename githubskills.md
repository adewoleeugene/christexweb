# Christex Foundation Skills Framework

A reusable contributor skills framework for all Christex Foundation projects.

This framework standardizes:
- Skill growth
- Branching & Pull Request discipline
- Collaboration standards
- Technical quality
- Community impact

---

# 1. Skill Categories

## 1.1 Technical Skills

Core engineering capabilities required to build and maintain projects.

### Areas
- Git & Version Control
- Branching Strategy
- Pull Request Management
- Backend Development
- Frontend Development
- Testing
- CI/CD
- Security Best Practices

---

## 1.2 Design & UX

- UI Systems
- UX Flows
- Accessibility
- Prototyping
- Interaction Design

---

## 1.3 Product & Planning

- PRD Writing
- Roadmapping
- MVP Definition
- Metrics & Analytics
- Iteration

---

## 1.4 Quality & Review

- Code Reviews
- Documentation
- Test Coverage
- Refactoring
- Technical Debt Management

---

## 1.5 Collaboration & Communication

- Async Communication
- Clear PR Descriptions
- Constructive Feedback
- Sprint Participation
- Cross-team Coordination

---

## 1.6 Governance & Process

- Issue Tracking Discipline
- Branch Naming Standards
- Pull Request Standards
- Security Compliance
- Repository Hygiene

---

# 2. Skill Levels

| Level     | Description |
|-----------|------------|
| Novice    | Understands fundamentals. Needs guidance. |
| Competent | Works independently. Follows standards. |
| Advanced  | Improves systems. Mentors others. |
| Expert    | Defines standards. Leads architecture and process. |

---

# 3. Git, Branch & Pull Request Skills

This section applies to ALL Christex Foundation repositories.

## 3.1 Branch Naming Convention

Branches MUST follow this format:

feature/<short-description>
bugfix/<issue-number>
chore/<task-description>
refactor/<component>
docs/<section>

Examples:

feature/add-auth-flow
bugfix/issue-34
docs/update-readme

---

## 3.2 Branch Workflow Standard

### Step 1 — Sync Main

git checkout main  
git pull origin main  

### Step 2 — Create Branch

git checkout -b feature/feedback-dashboard  

### Step 3 — Work & Commit

Use structured commit messages:

feat: add dashboard filters  
fix: resolve login validation bug  
docs: update API usage  

### Step 4 — Push Branch

git push origin feature/feedback-dashboard  

### Step 5 — Open Pull Request

PR Requirements:
- Clear summary
- Reference related issue
- Screenshots (if UI changes)
- Explain reasoning
- Request reviewer

---

## 3.3 Pull Request Skill Levels

### Git & PR — Novice
- Can clone repository
- Can commit and push
- Can open a basic PR

### Git & PR — Competent
- Follows branch naming standards
- Writes structured commit messages
- Writes clear PR descriptions
- Responds to review feedback properly

### Git & PR — Advanced
- Handles rebasing & complex merges
- Reviews PRs effectively
- Maintains clean commit history
- Enforces contribution standards

### Git & PR — Expert
- Designs repository workflow
- Defines branching model
- Implements CI enforcement
- Improves contributor experience

---

# 4. How This Framework Is Used

## Onboarding
New contributors are evaluated against skill levels.

## Task Assignment
Task complexity is matched to contributor level.

## Reviews
Quarterly or project-based skill reviews.

## Growth Path
Contributors move from:
Novice → Competent → Advanced → Expert

---

# 5. Core Principle

At Christex Foundation:

- Every contribution happens through a branch.
- Every change goes through a Pull Request.
- Every Pull Request is reviewed.
- Skills are measurable and transferable across projects.
- Process discipline is part of engineering excellence.

---

# 6. Non-Negotiables

- No direct pushes to main.
- All changes require PR.
- All PRs require review.
- Clear commit messages required.
- Branch naming standards must be followed.

---

End of Document