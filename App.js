/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health'



const Section = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  /* Permission options */
  const permissions = {
    permissions: {
      read: [AppleHealthKit.Constants.Permissions.HeartRate],
      write: [
        AppleHealthKit.Constants.Permissions.Steps,
        AppleHealthKit.Constants.Permissions.Weight,
        AppleHealthKit.Constants.Permissions.Workout,
      ],
    },
  }

  if (Platform.OS === 'ios') {
    AppleHealthKit.initHealthKit(permissions, (error) => {
      /* Called after we receive a response from the system */
      AppleHealthKit.getAuthStatus(permissions, (err, results) => {
        console.log(err, results, 'AUTH STATUS')
      })
      if (error) {
        console.log('[ERROR] Cannot grant permissions!')
      }
    })
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              let options = {
                type: 'AmericanFootball', // See HealthActivity Enum
                startDate: new Date(2021, 5, 25, 19, 0, 0).toISOString(),
                endDate: new Date(2021, 5, 25, 19, 30, 0).toISOString(),
                energyBurned: 50, // In Energy burned unit
                distance: 50, // In Distance unit
              }

              AppleHealthKit.saveWorkout(
                (options),
                (err, results) => {
                  if (err) {
                    console.log('error saving workout to Healthkit: ', err)
                    return
                  }
                  // workout successfully saved
                  console.log(results, 'workout successfully saved')
                },
              )
            }}
          >
            <Text>Add activity</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
