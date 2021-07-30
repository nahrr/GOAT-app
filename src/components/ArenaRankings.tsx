import React from "react";
import { IPost } from "./ArenaAPI";
import { ArenaCard } from "./ArenaCard";

export function ArenaRankings({ posts }: { posts: IPost[] }) {
  return (
    <div className="">
      <div className="overflow-x-auto mt-12 ">
        <table className="table-auto sm:w-2/3 mx-auto bg-black z-50 text-left">
          <thead className="bg-black border-solid border-b-2 border-yellow-100">
            <tr className="">
              <th className="text-white py-4 px-6"></th>
              <th className="text-white py-4 px-6">Rank</th>
              <th className="text-white py-4 px-6">Team</th>
              <th className="text-white py-4 px-6">{}</th>
              <th className="text-white py-4 px-6">Realm</th>
              <th className="text-white py-4 px-6">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-yellow-100">
            {posts.map((post, i) => (
              <ArenaCard
                key={i}
                rank={post.rank}
                team={post.team.name}
                faction={post.faction.type}
                realm={post.team.realm.slug}
                rating={post.rating}
                played={post.season_match_statistics.played}
                won={post.season_match_statistics.won}
                lost={post.season_match_statistics.lost}
                class={post.team.members.map(
                  (playable_class, i) =>
                    playable_class.character.playable_class.id + " "
                )}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}