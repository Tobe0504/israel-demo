import { ExternalPathString, Link, RelativePathString } from "expo-router";
import React, { Children } from "react";
import { ScrollView, Text, type ViewProps } from "react-native";
import { View } from "react-native";
import { ThemedText } from "./ThemedText";

type CategoriesTypes = ViewProps & {
  title?: string;
  caption?: string;
  url?: RelativePathString | ExternalPathString | any;
  children: React.ReactNode;
  isNotScroll?: boolean;
  style?: any;
  noMargin?: boolean;
};

const Categories = ({
  title,
  caption,
  url,
  children,
  isNotScroll,
  style,
  noMargin,
  ...rest
}: CategoriesTypes) => {
  return (
    <View {...rest} style={!noMargin && { marginBottom: 24 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
        }}
      >
        {(title || caption) && (
          <View>
            {title && (
              <ThemedText type="subtitle" style={{ marginBottom: 11 }}>
                {title}
              </ThemedText>
            )}
            {caption && <ThemedText>{caption}</ThemedText>}
          </View>
        )}
        {url && (
          <Link
            href={url}
            style={{ fontWeight: 500, fontFamily: "PoppinsMedium" }}
          >
            <Text style={{ color: "#F4811F" }}>View all</Text>
          </Link>
        )}
      </View>
      <ScrollView
        horizontal
        style={{
          paddingVertical: 11,
          flexDirection: "row",
          padding: 0,
        }}
        scrollEnabled={isNotScroll}
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default Categories;
