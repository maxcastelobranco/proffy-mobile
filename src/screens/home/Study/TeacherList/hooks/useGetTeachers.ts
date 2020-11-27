import { useEffect, useState } from "react";

import { User } from "../../../../../context/reducers/authenticationReducer";
import { api } from "../../../../../services/api";

export const useGetTeachers = () => {
  const [loadingTeachers, setLoadingTeachers] = useState(true);
  const [teachersEmoji, setTeachersEmoji] = useState("😭");
  const [teachers, setTeachers] = useState<User[]>([]);

  const getTeachers = async () => {
    return api.get<User[]>("users", {});
  };

  useEffect(() => {
    getTeachers().then(({ data }) => {
      setTeachers(data);
      if (teachers.length <= 1) {
        setTeachersEmoji("😐");
      } else if (teachers.length > 1) {
        setTeachersEmoji("😍");
      }
      setLoadingTeachers(false);
    });
  }, [teachers.length]);

  return {
    loadingTeachers,
    teachersEmoji,
    teachers,
  };
};
