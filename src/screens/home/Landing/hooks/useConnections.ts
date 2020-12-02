import { useEffect, useState } from "react";

import { useAppContext } from "../../../../context";
import { api } from "../../../../services/api";
import { User } from "../../../../context/reducers/authenticationReducer";

export const useConnections = () => {
  const {
    state: { authentication },
  } = useAppContext();

  const [connections, setConnections] = useState(0);

  useEffect(() => {
    api.get<User[]>("users").then(({ data }) => {
      const { numberOfLikes } = data.reduce(
        (acc, curr) => {
          if (curr.favoriteTeachersIds?.includes(authentication.user.id)) {
            acc.numberOfLikes += 1;
          }

          return acc;
        },
        {
          numberOfLikes: 0,
        }
      );

      const numberOfConnections = authentication.user.favoriteTeachersIds
        ? numberOfLikes + authentication.user.favoriteTeachersIds.length
        : numberOfLikes;

      setConnections(numberOfConnections);
    });
  }, [authentication.user.favoriteTeachersIds, authentication.user.id]);

  return connections;
};
