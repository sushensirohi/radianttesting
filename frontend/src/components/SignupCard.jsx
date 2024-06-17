import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
	Select,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
  import { useSetRecoilState } from "recoil";
  import authScreenAtom from "../atoms/authAtom";
  import useShowToast from "../hooks/useShowToast";
  import userAtom from "../atoms/userAtom";
  
  export default function SignupCard() {
	const [showPassword, setShowPassword] = useState(false);
	const setAuthScreen = useSetRecoilState(authScreenAtom);
	const [inputs, setInputs] = useState({
	  name: "",
	  username: "",
	  email: "",
	  password: "",
	  school: "",
	  interest: "", // Changed from favoriteGenre
	  specificInterest: "", // Changed from favoriteArtist
	});
	const [selectedSchool, setSelectedSchool] = useState("");
	const showToast = useShowToast();
	const setUser = useSetRecoilState(userAtom);
  
	const handleSignup = async () => {
	  try {
		const res = await fetch("/api/users/signup", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({
			...inputs,
			school: selectedSchool,
		  }),
		});
		const data = await res.json();
  
		if (data.error) {
		  showToast("Error", data.error, "error");
		  return;
		}
  
		localStorage.setItem("user-threads", JSON.stringify(data));
		setUser(data);
	  } catch (error) {
		showToast("Error", error, "error");
	  }
	};
  
	return (
	  <Flex align={"center"} justify={"center"}>
		<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
		  <Stack align={"center"}>
			<Heading fontSize={"4xl"} textAlign={"center"}>
			  Sign up
			</Heading>
			<Heading fontSize={"2xl"} textAlign={"center"}>
						We are currently in testing and nothing is final right now, for more updates check our instagram page
				</Heading>
		  </Stack>
		  <Box
			rounded={"lg"}
			bg={useColorModeValue("white", "gray.dark")}
			boxShadow={"lg"}
			p={8}
		  >
			<Stack spacing={4}>
			  <HStack>
				<Box>
				  <FormControl isRequired>
					<FormLabel>Full name</FormLabel>
					<Input
					  type="text"
					  onChange={(e) =>
						setInputs({ ...inputs, name: e.target.value })
					  }
					  value={inputs.name}
					/>
				  </FormControl>
				</Box>
				<Box>
				  <FormControl isRequired>
					<FormLabel>Username</FormLabel>
					<Input
					  type="text"
					  onChange={(e) =>
						setInputs({ ...inputs, username: e.target.value })
					  }
					  value={inputs.username}
					/>
				  </FormControl>
				</Box>
			  </HStack>
			  <FormControl isRequired>
				<FormLabel>Email address</FormLabel>
				<Input
				  type="email"
				  onChange={(e) =>
					setInputs({ ...inputs, email: e.target.value })
				  }
				  value={inputs.email}
				/>
			  </FormControl>
			  <FormControl isRequired>
				<FormLabel>Password</FormLabel>
				<InputGroup>
				  <Input
					type={showPassword ? "text" : "password"}
					onChange={(e) =>
					  setInputs({ ...inputs, password: e.target.value })
					}
					value={inputs.password}
				  />
				  <InputRightElement h={"full"}>
					<Button
					  variant={"ghost"}
					  onClick={() =>
						setShowPassword((showPassword) => !showPassword)
					  }
					>
					  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
					</Button>
				  </InputRightElement>
				</InputGroup>
			  </FormControl>
			  <FormControl isRequired>
				<FormLabel>Select School</FormLabel>
				<Select
				  placeholder="Select school"
				  onChange={(e) => setSelectedSchool(e.target.value)}
				  value={selectedSchool}
				>
				  <option value="Jaipuria">Jaipuria</option>
				  <option value="AMITY">AMITY</option>
				  <option value="DPS">DPS</option>
				</Select>
			  </FormControl>
			  <FormControl isRequired>
				<FormLabel>Interest</FormLabel>
				<Select
				  placeholder="Select interest"
				  onChange={(e) =>
					setInputs({ ...inputs, interest: e.target.value })
				  }
				  value={inputs.interest}
				>
				  <option value="Music">Music</option>
<option value="Sports">Sports</option>
<option value="Gaming">Gaming</option>
<option value="Tech">Tech</option>
<option value="Writing">Writing</option>
<option value="Art">Art</option>
<option value="Literature">Literature</option>
<option value="Photography">Photography</option>
<option value="Cooking">Cooking</option>
<option value="Dancing">Dancing</option>
<option value="Science">Science</option>
<option value="Fashion">Fashion</option>
<option value="Film">Film</option>
<option value="Design">Design</option>
<option value="Travel">Travel</option>
<option value="History">History</option>
<option value="Politics">Politics</option>
<option value="Languages">Languages</option>
<option value="Volunteering">Volunteering</option>
<option value="Fitness">Fitness</option>
<option value="Gardening">Gardening</option>
<option value="Theater">Theater</option>


				</Select>
			  </FormControl>
			  <FormControl>
				<FormLabel>What do you like about your interest?</FormLabel>
				<Input
				  placeholder="For eg: Cricket(Sports), Singing(Music)"
				  type="text"
				  onChange={(e) =>
					setInputs({ ...inputs, specificInterest: e.target.value })
				  }
				  value={inputs.specificInterest}
				/>
			  </FormControl>
			  <Stack spacing={10} pt={2}>
				<Button
				  loadingText="Submitting"
				  size="lg"
				  bg={useColorModeValue("gray.600", "gray.700")}
				  color={"white"}
				  _hover={{
					bg: useColorModeValue("gray.700", "gray.800"),
				  }}
				  onClick={handleSignup}
				>
				  Sign up
				</Button>
			  </Stack>
			  <Stack pt={6}>
				<Text align={"center"}>
				  Already a user?{" "}
				  <Link
					color={"blue.400"}
					onClick={() => setAuthScreen("login")}
				  >
					Login
				  </Link>
				</Text>
			  </Stack>
			</Stack>
		  </Box>
		</Stack>
	  </Flex>
	);
  }
  