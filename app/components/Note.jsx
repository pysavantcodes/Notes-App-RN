import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

const Note = ({keyVal, title, details, time, clicked, longPress}) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const secondsAgo = Math.floor((new Date() - new Date(time)) / 1000);
      if (secondsAgo < 10) {
        setTimeAgo('now');
      } else if (secondsAgo < 60) {
        setTimeAgo(`${secondsAgo}s`);
      } else if (secondsAgo < 3600) {
        const minutesAgo = Math.floor(secondsAgo / 60);
        setTimeAgo(`${minutesAgo}m`);
      } else if (secondsAgo < 86400) {
        const hoursAgo = Math.floor(secondsAgo / 3600);
        setTimeAgo(`${hoursAgo}h`);
      } else if (secondsAgo < 604800) {
        const daysAgo = Math.floor(secondsAgo / 86400);
        setTimeAgo(`${daysAgo}d`);
      } else if (secondsAgo < 2629746) {
        const weeksAgo = Math.floor(secondsAgo / 604800);
        setTimeAgo(`${weeksAgo}w`);
      } else if (secondsAgo < 31556952) {
        const monthsAgo = Math.floor(secondsAgo / 2629746);
        setTimeAgo(`${monthsAgo}m`);
      } else {
        const yearsAgo = Math.floor(secondsAgo / 31556952);
        setTimeAgo(`${yearsAgo}y`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <TouchableOpacity onLongPress={()=>longPress()} onPress={()=>clicked()} style={styles.card} key={keyVal}>
      <View>
        <Text
          style={{fontFamily: 'Poppins-Medium', color: 'black', fontSize: 16}}>
          {title.length > 24 ? title.substring(0,24) + "..." : title}
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            color: 'rgba(0,0,0,0.5)',
            fontSize: 12,
          }}>
          {details.length > 35 ? details.substring(0, 35) + '...' : details}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            color: 'rgba(0,0,0,0.5)',
            fontSize: 12,
          }}>
          {/* {updateTimeAgo(time)} */}
          {timeAgo}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Note;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 13,
  },
});