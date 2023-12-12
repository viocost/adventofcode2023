:- use_module(library(dcg/basics)).

read_file_to_numbers(FileName, Numbers) :-
    open(FileName, read, Stream),
    read_numbers(Stream, Numbers),
    close(Stream).

read_numbers(Stream, []) :-
    at_end_of_stream(Stream).

read_numbers(Stream, [LineNumbers|RestNumbers]) :-
    \+ at_end_of_stream(Stream),
    read_line_to_codes(Stream, Line),
    phrase(numbers(LineNumbers), Line),
    read_numbers(Stream, RestNumbers).

numbers([N|Ns]) --> integer(N), blanks, numbers(Ns).
numbers([]) --> [].

all_zeroes([]).
all_zeroes([0|Tail]) :-
    all_zeroes(Tail).

last_value([Head|[]], Last) :-
    Last is Head.
last_value([Head|Tail], Last) :-
    last_value(Tail, Last).



calculate_differences([_], []).
calculate_differences([First, Second|Tail], [Diff|DiffsTail]) :-
    Diff is Second - First,
    calculate_differences([Second|Tail], DiffsTail).

get_previous_value(Numbers, Value) :-
    all_zeroes(Numbers),
    Value is 0.

get_previous_value(Numbers, Value) :-
    Numbers = [First|_],
    not(all_zeroes(Numbers)),
    calculate_differences(Numbers, Differences),
    get_previous_value(Differences, NextValue),
    Value is First - NextValue.


get_next_value(Numbers, Value) :-
    all_zeroes(Numbers),
    Value is 0.

get_next_value(Numbers, Value) :-
    not(all_zeroes(Numbers)),
    calculate_differences(Numbers, Differences),
    get_next_value(Differences, NextValue),
    last_value(Numbers, LastValue),
    Value is LastValue + NextValue.

backward_extrapolation([], Acc, Result) :-
    Result is Acc.

backward_extrapolation([Walk|Rest], Acc, Result) :-
    get_previous_value(Walk, PreviousValue),
    backward_extrapolation(Rest, Acc + PreviousValue, Result).

forward_extrapolation([], Acc, Result) :-
    Result is Acc.

forward_extrapolation([Walk|Rest], Acc, Result) :-
    get_next_value(Walk, PreviousValue),
    forward_extrapolation(Rest, Acc + PreviousValue, Result).

calculate_answer(ForwardExtrapolation, BackwardExtrapolation) :-
    read_file_to_numbers('input', Walks),
    forward_extrapolation(Walks, 0, ForwardExtrapolation),
    backward_extrapolation(Walks, 0, BackwardExtrapolation).
