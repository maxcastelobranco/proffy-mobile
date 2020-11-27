import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";

import { User } from "../../../../../context/reducers/authenticationReducer";
import { api } from "../../../../../services/api";
import { useAppContext } from "../../../../../context";

export const useGetFavorites = () => {
  const {
    state: {
      authentication: { user },
    },
  } = useAppContext();
  const [loadingTeachers, setLoadingTeachers] = useState(true);
  const [favoriteTeachersEmoji, setFavoriteTeachersEmoji] = useState("😭");
  const [favoriteTeachers, setFavoriteTeachers] = useState<User[]>([]);

  const getFavorites = React.useCallback(async () => {
    const requests: Promise<AxiosResponse<User[]>>[] = [];

    for (let i = 0; i < user.favoriteTeachersIds.length; ++i) {
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

    return Promise.all(requests);
  }, [user.favoriteTeachersIds]);

  useEffect(() => {
    getFavorites().then((response) => {
      const teachers = response.map((value) => value.data[0]);

      setFavoriteTeachers(teachers);

      if (teachers.length <= 1) {
        setFavoriteTeachersEmoji("😐");
      } else if (teachers.length > 1) {
        setFavoriteTeachersEmoji("😍");
      }

      setLoadingTeachers(false);
    });
  }, [getFavorites, user.favoriteTeachersIds]);

  return {
    favoriteTeachers,
    setFavoriteTeachers,
    favoriteTeachersEmoji,
    loadingTeachers,
  };
};
