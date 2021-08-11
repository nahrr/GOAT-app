export interface IPost {
    id: number;
    name: string;
    realm: string;
    region: string;
    season: string;
    bracket: string;
    season_match_statistics: {
      played: number;
      won: number;
      lost: number;
    };
    faction: null | {
      type: string | null;
    };
    rating: number;
    rank: number;
    team: {
      name: string;
      realm: {
        slug: string;
      };
      members: [
        {
          character: {
            name: string;
            playable_class: {
              key: {
                href: string;
              };
              id: number;
            };
          };
          rating: number;
        }
      ];
    };
  }