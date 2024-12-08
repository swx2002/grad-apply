import { useOthers, useSelf } from "@liveblocks/react/suspense";

export function Avatars() {
  const users = useOthers();
  console.log(users);
  const currentUser = useSelf();

  return (
    <div className="flex pl-0 pr-3">
      {users.map(({ connectionId, info }) => {
        return (
          <Avatar key={connectionId} picture={info.picture} name={info.name} />
        );
      })}

      {currentUser && (
        <div className="relative ml-8 first:ml-0">
          <Avatar
            picture={currentUser.info.picture}
            name={currentUser.info.name}
          />
        </div>
      )}
    </div>
  );
}

export function Avatar({ picture, name }: { picture: string; name: string }) {
  return (
    <div 
      className="relative group"
    > 
      <div 
        className="relative flex content-center border-solid border-white rounded-full w-10 h-10 bg-gray-400 ml-[-0.75rem]]
      " data-tooltip={name}>
        <img
          src={picture}
          className="rounded-full w-full h-full"
          data-tooltip={name}
        />
      </div>
      <span 
        className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in-out px-2.5 py-1.5 mt-2.5 text-white text-xs rounded-lg z-10 bg-black whitespace-nowrap"
      >
        {name}
      </span>
    </div>
  );
}