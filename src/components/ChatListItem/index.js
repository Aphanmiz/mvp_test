import { View, Text, Image } from "react-native";

const ChatListItem = () => {
  return (
    <View>
			{/* User Avatar */}
      <Image
        source={{
          uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/lukas.jpeg",
        }}
        style={{ width: 50, height: 50 }}
      />

			{/* Content Container */}
      <View>
				{/* Row */}
				<View>
	        <Text>Lukas</Text>
		      <Text>07:30</Text>
	      </View>

        <Text>Oke</Text>
      </View>
    </View>
  );
};

export default ChatListItem;