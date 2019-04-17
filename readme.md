# React Minesweeper

This was my first usage of React in a non-trivial application, and
also my first usage of a reducer to achieve state management
reminiscent of Elm or Redux.

## Wins:

1. Core functionality of minesweeper is implemented and separated into
'pure' helper functions such as getBombSpots, setupCells, getCellElements,
and getAdjacents.
2. Simple React app built with parcel, no other dependencies (besides dev things
like eslint).
3. Utilizes getReducer React hook to make state changes easy to
reason about.
4. CSS Grid to layout minefield, simple but nice colors and icons.

## Issues:

1. Reducer is verbose and doesn't utilize immutable strategies such as
Object.assign or external libraries.
2. All app logic is in minefield.jsx instead of being broken out into
smaller and more single-purpose files (actions, reducers, subcomponents, etc).

## Next steps:

I want to re-implement the state handling using actual Redux after
some further research into that library. That will be a good experience
in using a popular state management library to become familiar
with common terminology and best practices. It will also be nice to
have devtools support for state. In that project, I also am considering
the use of Immutable.js.

I also am thinking about implementing this in Elm. Elm provides all the
benefits of React/Redux, extra benefits of a fully functional language,
and very simple build/dependency setup process. With React and Redux you
are already looking at two dependencies, not to mention webpack, babel, etc.
