import * as React from "react";

interface SearchbarProps {
  /** Söktermen man använder när man söker och value på inputen */
  searchTerm: string;
  clearSearchterm: () => void;
  /** Uppdaterar searchterm */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Searchbar = ({
  searchTerm,
  onChange,
  clearSearchterm,
}: SearchbarProps) => {
  const showClearBtn = searchTerm ? (
    <span className="clearSearchterm" onClick={() => clearSearchterm()}>
      X
    </span>
  ) : null;
  return (
    <div className="searchbarContainer">
      <input type="text" value={searchTerm} onChange={(e) => onChange(e)} />
      {showClearBtn}
    </div>
  );
};
