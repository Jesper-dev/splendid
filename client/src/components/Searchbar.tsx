import * as React from "react";

interface SearchbarProps {
  /** Söktermen man använder när man söker och value på inputen */
  searchTerm: string;
  /** Function som sköter filteringen */
  onFilter?: () => void;
  /** Uppdaterar searchterm */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Searchbar = ({
  searchTerm,
  onFilter,
  onChange,
}: SearchbarProps) => {
  return (
    <section className="searchbarContainer">
      <input type="text" value={searchTerm} onChange={(e) => onChange(e)} />
      {/* <button onClick={() => onFilter()}>sök</button> */}
    </section>
  );
};
