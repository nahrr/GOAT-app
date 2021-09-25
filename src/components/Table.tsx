import React from "react";
import {ArenaPosts} from "../Interface/IPost";
import { ArenaCard } from "./ArenaCard";
export function Table({ posts, currentPage }: { posts: ArenaPosts[]; currentPage: number}) {
  
  return (
    
      <div className="overflow-x-auto mt-12 ">
        <table className="table-fixed sm:w-2/3 mx-auto bg-black text-left">
          <thead className="bg-black border-solid border-b-2 border-yellow-100">
            <tr className="">
              <th className="w-1/12"></th>
              <th className="text-white py-4 w-1/12">Rank</th>
              <th className="text-white py-4 px-0 w-3/12">Team</th>
              <th className="text-white py-4 px-2 w-2/6">Comp</th>
              <th className="text-white py-4 px-6 w-1/6">Realm</th>
              <th className="text-white py-4 px-6 w-1/6">Rating</th>
            </tr>
          </thead>
          {/* divide-y divide-yellow-100 */}
          <tbody className="">
            {posts.map((post, i) => (
              <ArenaCard
                key={i}
                rank={post.rank}
                team={post.team.name}
                faction={post.faction == null ? null : post.faction.type}
                realm={post.team.realm.slug}
                rating={post.rating}
                played={post.season_match_statistics.played}
                won={post.season_match_statistics.won}
                lost={post.season_match_statistics.lost}
                name={post.team.members.map(
                  (player_name, i) => player_name.character.name
                )}
                class={post.team.members.map(
                  (playable_class, i) =>
                    playable_class.character.playable_class.id + " "
                )}
                currentPage={currentPage}
              />
            ))}
          </tbody>
        </table>
      </div>
  );
}
