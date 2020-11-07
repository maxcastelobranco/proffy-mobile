import React, { useCallback, useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  ListRenderItem,
  View,
} from "react-native";
import { useTheme } from "@shopify/restyle";
import {
  Directions,
  FlingGestureHandler,
  State,
} from "react-native-gesture-handler";

import { Box, Text, Theme } from "../../../../../theme";
import { TabNavigationProps } from "../../../../../routes/tabs";
import MainHeader from "../../../components/MainHeader";
import TeacherCard from "../TeacherCard";
import { User } from "../../../../../context/reducers/authenticationReducer";
import { useAppContext } from "../../../../../context";

import { useGetFavorites } from "./hooks/useGetFavorites";
import { useStyles } from "./styles";

const { width } = Dimensions.get("window");
const VISIBLE_ITEMS = 5;

const Favorites: React.FC<TabNavigationProps<"Favorites">> = () => {
  const theme = useTheme<Theme>();
  const {
    state: {
      authentication: { user },
    },
  } = useAppContext();
  const {
    favoriteTeachers,
    favoriteTeachersEmoji,
    setStartIndex,
  } = useGetFavorites();
  const {
    titleContainerStyles,
    pageTitleStyles,
    favoriteProffysStyles,
    flatListStyles,
    flatListContentContainerStyles,
  } = useStyles();

  const CARD_WIDTH = width - theme.spacing.l * 2;

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;

  const setActiveIndex = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      scrollXIndex.setValue(index);
    },
    [scrollXIndex]
  );

  useEffect(() => {
    if (currentIndex === 4) {
      setStartIndex((prevState) => prevState + 4);
      setActiveIndex(0);
    }
  }, [currentIndex, setActiveIndex, setStartIndex]);

  useEffect(() => {
    Animated.timing(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  }, [scrollXAnimated, scrollXIndex]);

  const renderItem: ListRenderItem<User> = ({ item, index }) => {
    const inputRange = [index - 1, index, index + 1];

    const animatedStyle = {
      opacity: scrollXAnimated.interpolate({
        inputRange,
        outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
      }),
      transform: [
        {
          translateX: scrollXAnimated.interpolate({
            inputRange,
            outputRange: [30, 0, -100],
          }),
        },
        {
          scale: scrollXAnimated.interpolate({
            inputRange,
            outputRange: [0.9, 1, 1.1],
          }),
        },
      ],
    };

    return (
      <Animated.View
        style={[
          {
            position: "absolute",
            left: -CARD_WIDTH / 2,
          },
          animatedStyle,
        ]}
      >
        <TeacherCard profile={item} />
      </Animated.View>
    );
  };

  return (
    <>
      <Box flex={0.46}>
        <MainHeader label="Study" />
        <Box {...titleContainerStyles}>
          <Text {...pageTitleStyles}>My Favorite{"\n"}Proffys</Text>
          <Text {...favoriteProffysStyles}>
            {`${favoriteTeachersEmoji} ${user.favoriteTeachersIds.length} Proffys`}
          </Text>
        </Box>
      </Box>
      <FlingGestureHandler
        key="left"
        direction={Directions.LEFT}
        onHandlerStateChange={({ nativeEvent: { state } }) => {
          if (state === State.END) {
            if (currentIndex === favoriteTeachers.length - 1) {
              return;
            }
            setActiveIndex(currentIndex + 1);
          }
        }}
      >
        <FlingGestureHandler
          key="right"
          direction={Directions.RIGHT}
          onHandlerStateChange={({ nativeEvent: { state } }) => {
            if (state === State.END) {
              if (currentIndex === 0) {
                return;
              }
              setActiveIndex(currentIndex - 1);
            }
          }}
        >
          <FlatList
            data={favoriteTeachers}
            keyExtractor={({ id }) => id}
            style={flatListStyles}
            contentContainerStyle={flatListContentContainerStyles}
            horizontal
            scrollEnabled={false}
            removeClippedSubviews={false}
            CellRendererComponent={({ style, index, children, ...props }) => {
              const newStyle = [style, { zIndex: 5 - index }];

              return (
                <View style={newStyle} {...props}>
                  {children}
                </View>
              );
            }}
            {...{ renderItem }}
          />
        </FlingGestureHandler>
      </FlingGestureHandler>
    </>
  );
};

export default Favorites;
