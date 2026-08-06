import React, { useState, useRef, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/**
 * Generic animated accordion.
 *
 * Props:
 *   title      - string shown in the header
 *   badge      - optional string shown after the title (e.g. "(10)")
 *   th         - theme object
 *   children   - content rendered inside when open
 */
const Accordion = ({ title, badge, th, children, titleSize, scrollRef }) => {
  const [open, setOpen]             = useState(false);
  const [bodyHeight, setBodyHeight] = useState(0);
  const animHeight  = useRef(new Animated.Value(0)).current;
  const animOpacity = useRef(new Animated.Value(0)).current;
  const measured    = useRef(false);
  const yOffset     = useRef(0);

  const onBodyLayout = useCallback((e) => {
    const h = e.nativeEvent.layout.height;
    if (!measured.current && h > 0) {
      measured.current = true;
      setBodyHeight(h);
    }
  }, []);

  const toggle = () => {
    const opening = !open;
    const toValue = opening ? bodyHeight : 0;
    Animated.parallel([
      Animated.timing(animHeight,  { toValue,                    duration: 300, useNativeDriver: false }),
      Animated.timing(animOpacity, { toValue: opening ? 1 : 0,  duration: 300, useNativeDriver: false }),
    ]).start();
    setOpen(opening);

    if (opening && scrollRef?.current) {
      setTimeout(() => {
        scrollRef.current.scrollTo({ y: Math.max(0, yOffset.current - 16), animated: true });
      }, 120);
    }
  };

  return (
    <View
      onLayout={(e) => { yOffset.current = e.nativeEvent.layout.y; }}
      style={[styles.card, { backgroundColor: th.surface, borderColor: th.surfaceBorder }]}
    >
      {/* Header */}
      <TouchableOpacity onPress={toggle} style={styles.header} activeOpacity={0.7}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color: th.text, fontSize: titleSize ?? 15 }]}>{title}</Text>
          {badge != null && (
            <Text style={[styles.badge, { color: th.textMuted }]}>{badge}</Text>
          )}
        </View>
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={18} color={th.textMuted} />
      </TouchableOpacity>

      {/* Animated body */}
      <Animated.View style={{ height: animHeight, overflow: "hidden", opacity: animOpacity }}>
        {/* Hidden measure pass */}
        {!measured.current && (
          <View onLayout={onBodyLayout} style={styles.measureLayer}>
            {children}
          </View>
        )}
        {/* Visible content */}
        {measured.current && children}
      </Animated.View>
    </View>
  );
};

export const accordionShared = StyleSheet.create({
  separator: { height: 1 },
});

const styles = StyleSheet.create({
  card:        { borderRadius: 12, borderWidth: 1.5, marginBottom: 10, overflow: "hidden" },
  header:      { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 14 },
  titleRow:    { flexDirection: "row", alignItems: "center", gap: 8 },
  title:       { fontSize: 15, fontWeight: "700" },
  badge:       { fontSize: 14 },
  measureLayer:{ position: "absolute", opacity: 0, pointerEvents: "none" },
});

export default Accordion;
