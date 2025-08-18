export interface Character {
  id: string;
  name: string;
  species: string;
  image?: string;
}

export interface CharacterResponseData {
  data: {
    characters: {
      total: number;
      edges: Character[];
    };
  };
}
