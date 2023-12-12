discriminant(A, B, C, D) :-
    D is sqrt(B**2 - (4 * A * C)).


roots(A, B, C, R1, R2) :-
    discriminant(A, B, C, D),
    D >= 0,
    R1 is (B * -1.0 + D) / (2 * A),
    R2 is (B * -1.0 - D) / (2 * A).
