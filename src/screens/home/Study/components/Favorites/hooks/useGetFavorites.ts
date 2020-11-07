import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";

import { User } from "../../../../../../context/reducers/authenticationReducer";
import { api } from "../../../../../../services/api";
import { useAppContext } from "../../../../../../context";

export const useGetFavorites = () => {
  const {
    state: {
      authentication: { user },
    },
  } = useAppContext();
  const [startIndex, setStartIndex] = useState(0);
  const [favoriteTeachersEmoji, setFavoriteTeachersEmoji] = useState("😭");
  const [favoriteTeachers, setFavoriteTeachers] = useState<User[]>([]);

  const getFavorites = React.useCallback(
    async (start: number) => {
      const end = start + 5;
      const requests: Promise<AxiosResponse<User[]>>[] = [];

      if (start + 5 <= user.favoriteTeachersIds.length) {
        for (let i = start; i < end; i++) {
          const userId = user.favoriteTeachersIds[i];

          if (userId) {
            const request = api.get("users", {
              params: {
                id: userId,
              },
            });
            requests.push(request);
          }
        }
      }

      return Promise.all(requests);
    },
    [user.favoriteTeachersIds]
  );

  useEffect(() => {
    getFavorites(startIndex).then((response) => {
      const teachers = response?.map((value) => value.data[0]);

      setFavoriteTeachers(teachers);

      if (teachers.length === 1) {
        setFavoriteTeachersEmoji("😐");
      } else if (teachers.length > 1) {
        setFavoriteTeachersEmoji("😍");
      }
    });
  }, [getFavorites, startIndex, user.favoriteTeachersIds]);

  return {
    favoriteTeachers,
    favoriteTeachersEmoji,
    setStartIndex,
  };
};
