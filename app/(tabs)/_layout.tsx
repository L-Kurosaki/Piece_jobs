import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';
import { Chrome as Home, Briefcase, Plus, MessageSquare, User } from 'lucide-react-native';
import NotificationBadge from '../../components/ui/NotificationBadge';

export default function TabLayout() {
  // Mock notification counts
  const messageCount = 2;
  const jobCount = 1;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary[500],
        tabBarInactiveTintColor: Colors.neutral[400],
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: 'Jobs',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <Briefcase size={size} color={color} />
              {jobCount > 0 && <NotificationBadge count={jobCount} size="small" />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: 'Post',
          tabBarIcon: ({ color, size }) => <Plus size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <MessageSquare size={size} color={color} />
              {messageCount > 0 && <NotificationBadge count={messageCount} size="small" />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    borderTopColor: Colors.neutral[200],
    paddingTop: 8,
    paddingBottom: 8,
    height: 65,
    elevation: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    marginTop: 2,
  },
  iconContainer: {
    position: 'relative',
  },
});