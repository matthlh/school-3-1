# STAT 251 lecture 10 — Properties of mean and variance, covariance, sums and maxima of independent random variables (Fri Oct 2)

Pre-lecture outline from the BL deck posted on Canvas (16 slides). This file is deleted when the lecture is logged.

## What the deck claims

- Expectation is linear: E(aX + b) = aE(X) + b for any constants, and E(X + Y) = E(X) + E(Y) for any pair of random variables, independent or not.
- E(XY) = E(X)E(Y) holds only when X and Y are independent.
- Var(aX + b) = a²Var(X). Adding a constant does nothing to the variance.
- If X and Y are independent, Var(X + Y) = Var(X) + Var(Y) and Var(X − Y) = Var(X) + Var(Y). The minus sign does not turn into a subtraction.
- The deck proves the shortcut Var(X) = E(X²) − [E(X)]² by expanding E[(X − μ)²].
- Covariance is Cov(X, Y) = E[(X − E(X))(Y − E(Y))] = E[XY] − E[X]E[Y].
- Covariance is positive when large X tends to come with large Y, negative when large X tends to come with small Y.
- Independent random variables have Cov(X, Y) = 0.
- In general Var(X + Y) = Var(X) + Var(Y) + 2Cov(X, Y), and Var(aX + bY + c) = a²Var(X) + b²Var(Y) + 2abCov(X, Y). The covariance term drops when X and Y are independent.
- Examples 8 and 9 use Var(X) = 5, Var(Y) = 10, Cov(X, Y) = 2 and ask for Var(2X + 3Y) and Var(2X − Y).
- For n independent variables and Y = a₁X₁ + … + aₙXₙ: E(Y) = Σ aᵢE(Xᵢ) and Var(Y) = Σ aᵢ²Var(Xᵢ).
- When the Xᵢ share a mean μ and variance σ², the sequence is called a random sample, and E(Y) = (Σ aᵢ)μ, Var(Y) = (Σ aᵢ²)σ².
- The sample mean X̄ of a random sample has E(X̄) = μ and Var(X̄) = σ²/n. The deck derives both, pulling 1/n out of E and 1/n² out of Var.
- The maximum V = max{X₁, …, Xₙ} of independent variables models the lifetime of n components in parallel and the largest flood level over n years.
- For identically distributed Xᵢ with cdf F_X: F_V(v) = P(all Xᵢ ≤ v) = [F_X(v)]ⁿ, using independence to multiply.
- Differentiating gives the pdf of the maximum: f_V(v) = n[F_X(v)]ⁿ⁻¹ f_X(v).
- The title promises the minimum too, but the deck stops at the maximum. Expect the minimum in class through the complement: P(min > v) = [1 − F_X(v)]ⁿ, so F_min(v) = 1 − [1 − F_X(v)]ⁿ.
- Before the next class (lecture 11, activities and examples): complete the Chapter 4 pre-activity worksheet (Activity 3) posted under the lecture 11 material. The deck says lecture 11 will ask questions about it.

## Three pre-lecture questions

1. Var(X) = 5, Var(Y) = 10, Cov(X, Y) = 2. Compute Var(2X + 3Y) and Var(2X − Y) from the general formula, then say what each becomes if X and Y are independent. (134 and 22; independent gives 110 and 30.)
2. From a blank page, derive E(X̄) = μ and Var(X̄) = σ²/n for a random sample of size n. Name the exact step where independence is used and the step where it is not needed.
3. A system has n identical independent components in parallel, each with lifetime cdf F. Derive the cdf and pdf of the system lifetime. Then do the series case, where the system dies at the first failure.
