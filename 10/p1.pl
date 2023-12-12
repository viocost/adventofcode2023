:- use_module(library(dcg/basics)).
:- dynamic cell/3.
:- dynamic visited/2.

read_map(FileName, Map) :-
    open(FileName, read, Stream),
    read_lines(Stream, Lines),
    close(Stream),
    map_lines_to_chars(Lines, Map, 0).

read_lines(Stream, []) :-
    at_end_of_stream(Stream).

read_lines(Stream, [Line|Lines]) :-
    \+ at_end_of_stream(Stream),
    read_line_to_string(Stream, Line),
    read_lines(Stream, Lines).


save_chars([], _, _).
save_chars([Char|Chars], LineNumber, CharNumber) :-
    assertz(cell(Char, LineNumber, CharNumber)),
    NextCharNumber is CharNumber + 1,
    save_chars(Chars, LineNumber, NextCharNumber).



map_lines_to_chars([], [], _).
map_lines_to_chars([Line|Lines], [Chars|Map], LineNumber) :-
    string_chars(Line, Chars),
    save_chars(Chars, LineNumber, 0),
    NextLineNumber is LineNumber + 1,
    map_lines_to_chars(Lines, Map, NextLineNumber).

mark_visited(Row, Column) :-
    assertz(visited(Row, Column)).

loop_length(Row, Column, LoopLength, Answer) :-
    cell('S', Row, Column),
    visited(Row, Column),
    Answer is LoopLength.

pipe_cell(Row, Column),
    cell(Char, Row, Column),
    Char \= '.'.


connects(Row, Column, Direction, NextRow, NextColumn) :-
    cell(Char, Row, Column),
    pipe_cell(Row, Column),

connections(south, [('|', ['L',  '|', 'J']), ('F', ['|',  'L', 'J']), ('7', ['L', '|', 'J'])]).
connections(east, [('-', ['-',  'F', 'F']), ('L', ['-',  'F', 'F']), ('F', ['L', '|', 'J'])]).
connections(west, [('7', ['-',  'F', 'L']), ('J', ['-',  'F', 'L']), ('-', ['-', 'F', 'L'])]).
connections(north, [('|', ['|',  'F', '7']), ('J', ['|',  'F', '7']), ('L', ['|', 'F', '7'])]).

assert_connections(Direction, Source, Targets) :-
    member(Target, Targets),
    assertz(can_connect(Direction, Source, Target)),
    fail.
assert_connections(_, _, _).

initialize_connections :-
    connections(Direction, Pairs),
    member((Source, Targets), Pairs),
    assert_connections(Direction, Source, Targets),
    fail.
initialize_connections.



explore(Row, Column, CurrentChar, PreviousChar, Direction, StepCount) :-
    pipe_cell(Row, Column),
    cell(CurrentChar, Row, Column),
    not(visited(Row, Column)),
    can_connect(Direction, PreviousChar, CurrentChar),

    mark_visited(Row, Column),

    SouthRow is Row + 1,
    SouthColumn is Column,
    NorthRow is Row - 1,
    NorthColumn is Column,
    EastRow is Row,
    EastColumn is Column + 1,
    WestRow is StartFow,
    WestColumn is Column - 1,

    NextStepCount is StepCount + 1,

    explore(SouthRow, SouthColumn, CurrentChar, south, NextStepCount)
    StepCount is NextStepCount.

explore(Row, Column, 'S', PreviousChar, Direction, StepCount) :-
    visited(Row, Column),
    can_connect(Direction, PreviousChar, 'S'),
    StepCount is StepCount.

explore(Row, Column, StepCount) :-
    cell('S', Row, Column),
    not(visited(Row, Column)),
    SouthRow is Row + 1,
    SouthColumn is Column,
    NorthRow is Row - 1,
    NorthColumn is Column,
    EastRow is Row,
    EastColumn is Column + 1,
    WestRow is StartFow,
    WestColumn is Column - 1,

    NextStepCount is StepCount + 1,

    explore(SouthRow, SouthColumn, Row, Column, NextStepCount)
    StepCount is NextStepCount.



    % BASE: if cell is "S" and visited
    % makr cell visited
    % get all ajacent cells excluding previous
    % recurse on each
    %
    % for those that arent visited recurse
    %

start_position(Row, Column) :-
    cell('S', Row, Column).



get_answer(Row, Column) :-
    abolish(cell/3),
    read_map('input-test', Map),
    start_position(Row, Column).
