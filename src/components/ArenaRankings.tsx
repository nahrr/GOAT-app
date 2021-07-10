import React from "react";
import { IPost } from "./ArenaAPI";

export function ArenaRankings({ posts }: { posts: IPost[] }) {
  return (
    <div className="overflow-x-auto mt-12 ">
      <table className="table-auto sm:w-2/3 mx-auto bg-black z-50 text-left">
        <thead className="bg-gray-900">
          <tr className="">
            <th className="text-white py-4 px-6">Rank</th>
            <th className="text-white py-4 px-6">Name</th>
            <th className="text-white py-4 px-6">Realm</th>
            <th className="text-white py-4 px-6">Rating</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-yellow-100">
          {posts.map((post, i) => (
            <tr>
              <td className="">
                    <img
                      className="w-10 h-10 object-cover rounded-full"
                      alt="User avatar"
                      src="https://scontent.fbma2-1.fna.fbcdn.net/v/t1.18169-9/29398_1404341503065_4517994_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=de6eea&_nc_ohc=kZVm7h3pmY8AX9C20gO&_nc_ht=scontent.fbma2-1.fna&oh=1ee4b43536b266e82ece643a871b6cb2&oe=60EB41C0"
                    />
                  <div>
                    <p className="text-green-400 py-4 px-6"> {post.rank} </p>
                  </div>
              </td>
              <td className="text-red py-4 px-6">{post.name}</td>
              <td className="text-red py-4 px-6">{post.realm} </td>
              <td className="text-white py-4 px-6"> {post.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
