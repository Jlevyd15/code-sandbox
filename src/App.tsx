import * as React from "react";
import "./styles.css";

export default function App() {
  const [state, updateState] = React.useState({ "0": "an item" });
  const [inputState, updateInputState] = React.useState();

  const updateListOfItems = (keyToRemove?: string, value?: string) => {
    console.log(keyToRemove);
    // removing an item
    if (keyToRemove) {
      const newList = Object.entries(state).reduce(
        (accum, [itemKey, itemValue]) => {
          return keyToRemove !== itemKey
            ? { ...accum, [itemKey]: itemValue }
            : accum;
        },
        {}
      );
      return updateState(newList as any);
    }
    // adding an item
    return updateState({
      ...state,
      [Object.keys(state).length.toString()]: value
    });
  };

  const buildListItem = (key: string, value: string): JSX.Element => {
    return (
      <li key={key}>
        <span>{value}</span>
        <button onClick={() => updateListOfItems(key)}>Remove</button>
      </li>
    );
  };

  return (
    <div className="App">
      <div>
        <input onInput={e => updateInputState(e.target.value)} type="text" />
        <button onClick={() => updateListOfItems(undefined, inputState)}>
          Add new item
        </button>
      </div>
      {Object.keys(state).length >= 1 && (
        <ul>
          {Object.entries(state).map(
            ([key, value]: [string, string]) =>
              value && buildListItem(key, value)
          )}
        </ul>
      )}
    </div>
  );
}
