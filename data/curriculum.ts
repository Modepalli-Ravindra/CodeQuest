import { TopicData, ConceptType } from '../types';

// --- DATA GENERATION HELPERS ---

const THEMES = [
  { name: 'Space Explorer', role: 'Captain', goal: 'chart the unknown', item: 'stars' },
  { name: 'Python Wizard', role: 'Sorcerer', goal: 'master snakes', item: 'scrolls' },
  { name: 'Data Detective', role: 'Investigator', goal: 'solve mysteries', item: 'clues' },
  { name: 'Robot Trainer', role: 'Engineer', goal: 'teach bots', item: 'microchips' },
  { name: 'Jungle Guide', role: 'Ranger', goal: 'track animals', item: 'badges' },
];

const ICONS: Record<string, string> = {
  VARIABLES: 'Box', LOOPS: 'Repeat', CONDITIONS: 'Split', FUNCTIONS: 'Zap',
  LISTS: 'List', LOGIC: 'BrainCircuit', MATH: 'Calculator', STRINGS: 'Type',
  DICTIONARIES: 'Package', MODULES: 'Layout', FILES: 'FileText'
};

const COLORS: Record<string, string> = {
  VARIABLES: 'bg-blue-500', LOOPS: 'bg-green-500', CONDITIONS: 'bg-purple-500',
  FUNCTIONS: 'bg-orange-500', LISTS: 'bg-pink-500', LOGIC: 'bg-cyan-500',
  MATH: 'bg-red-500', STRINGS: 'bg-teal-500', DICTIONARIES: 'bg-yellow-500',
  MODULES: 'bg-indigo-500', FILES: 'bg-rose-500'
};

// Define a compact structure for topics to reach 100 items efficiently
interface MiniTopic {
  title: string;
  type: ConceptType;
  desc: string;
  concept: string;
  analogy: string;
  code: string;
  quiz: [string, string, string, string, number][]; // Question, Opt1, Opt2, Opt3, CorrectIndex
}

// --- THE BIG LIST OF 100 PYTHON TOPICS ---
const RAW_TOPICS: MiniTopic[] = [
  // 1. BASICS & VARIABLES (1-10)
  {
    title: "Intro to Python", type: "VARIABLES", desc: "Start here!",
    concept: "Python is a language that's easy to read and write.",
    analogy: "Like writing instructions in simple English.",
    code: "# Welcome to Python!\nprint('Hello World')",
    quiz: [["What is Python?", "A snake", "A coding language", "A movie", 1]]
  },
  {
    title: "Print Function", type: "VARIABLES", desc: "Say something.",
    concept: "print() shows text on the screen.",
    analogy: "Like using a megaphone.",
    code: "print('Hello')",
    quiz: [["What does print do?", "Saves file", "Shows text", "Stops code", 1]]
  },
  {
    title: "Comments", type: "VARIABLES", desc: "Hidden notes.",
    concept: "Lines starting with # are ignored by the computer.",
    analogy: "Sticky notes for humans.",
    code: "# This is a comment\nprint('Hi') # Comment",
    quiz: [["Symbol for comments?", "//", "#", "<!--", 1]]
  },
  {
    title: "Variables", type: "VARIABLES", desc: "Storing data.",
    concept: "Variables are names for stored values.",
    analogy: "A labeled box.",
    code: "score = 10",
    quiz: [["How to set a variable?", "var x = 10", "x = 10", "set x 10", 1]]
  },
  {
    title: "Integers", type: "VARIABLES", desc: "Whole numbers.",
    concept: "Integers (int) are numbers without decimals.",
    analogy: "Counting whole apples.",
    code: "age = 12",
    quiz: [["Which is an int?", "10.5", "10", "'10'", 1]]
  },
  {
    title: "Floats", type: "VARIABLES", desc: "Decimals.",
    concept: "Floats are numbers with decimal points.",
    analogy: "Measuring water (1.5 liters).",
    code: "price = 9.99",
    quiz: [["Which is a float?", "5", "5.0", "'5'", 1]]
  },
  {
    title: "Strings", type: "STRINGS", desc: "Text data.",
    concept: "Strings are text inside quotes.",
    analogy: "Words on a page.",
    code: "name = 'Python'",
    quiz: [["What surrounds a string?", "()", "[]", "''", 2]]
  },
  {
    title: "Booleans", type: "LOGIC", desc: "True or False.",
    concept: "Booleans are exactly True or False.",
    analogy: "A light switch.",
    code: "is_fun = True",
    quiz: [["Python keyword for true?", "true", "True", "TRUE", 1]]
  },
  {
    title: "Type Function", type: "VARIABLES", desc: "Check type.",
    concept: "type() tells you what kind of data it is.",
    analogy: "Looking at the label.",
    code: "type(5) # <class 'int'>",
    quiz: [["type(5.5) returns?", "int", "float", "str", 1]]
  },
  {
    title: "Input", type: "VARIABLES", desc: "Get user data.",
    concept: "input() pauses and waits for user typing.",
    analogy: "Asking a question.",
    code: "name = input('Who are you?')",
    quiz: [["input() returns what type?", "Always str", "Always int", "Varies", 0]]
  },

  // 2. MATH & OPERATORS (11-20)
  {
    title: "Addition (+)", type: "MATH", desc: "Summing up.",
    concept: "Adds two numbers.",
    analogy: "Combining two piles of coins.",
    code: "total = 5 + 3",
    quiz: [["5 + 2 equals?", "7", "52", "10", 0]]
  },
  {
    title: "Subtraction (-)", type: "MATH", desc: "Take away.",
    concept: "Subtracts right from left.",
    analogy: "Spending coins.",
    code: "left = 10 - 4",
    quiz: [["10 - 2 equals?", "12", "8", "5", 1]]
  },
  {
    title: "Multiplication (*)", type: "MATH", desc: "Times.",
    concept: "Multiplies numbers.",
    analogy: "3 bags of 5 apples.",
    code: "area = 5 * 5",
    quiz: [["Symbol for multiply?", "x", "*", "#", 1]]
  },
  {
    title: "Division (/)", type: "MATH", desc: "Divide.",
    concept: "Divides and always returns a float.",
    analogy: "Splitting a bill.",
    code: "share = 10 / 2 # 5.0",
    quiz: [["10 / 2 returns?", "5", "5.0", "2", 1]]
  },
  {
    title: "Floor Division (//)", type: "MATH", desc: "Whole divide.",
    concept: "Divides and rounds down to nearest whole number.",
    analogy: "How many full pizza boxes fits?",
    code: "boxes = 10 // 3 # 3",
    quiz: [["7 // 2 is?", "3.5", "3", "4", 1]]
  },
  {
    title: "Modulo (%)", type: "MATH", desc: "Remainder.",
    concept: "Gives the remainder of division.",
    analogy: "Leftovers after sharing.",
    code: "leftover = 10 % 3 # 1",
    quiz: [["10 % 2 is?", "0", "1", "5", 0]]
  },
  {
    title: "Power (**)", type: "MATH", desc: "Exponents.",
    concept: "Raises a number to a power.",
    analogy: "Growing exponentially.",
    code: "square = 3 ** 2 # 9",
    quiz: [["2 ** 3 is?", "6", "5", "8", 2]]
  },
  {
    title: "Order of Ops", type: "MATH", desc: "PEMDAS.",
    concept: "Parentheses first, then exponents, etc.",
    analogy: "Rules of the road.",
    code: "res = 2 + 3 * 4 # 14",
    quiz: [["2 + 2 * 2 equals?", "8", "6", "4", 1]]
  },
  {
    title: "Augmented Assign", type: "MATH", desc: "Shortcuts.",
    concept: "x += 1 is short for x = x + 1.",
    analogy: "Level up.",
    code: "x = 5\nx += 1 # 6",
    quiz: [["x *= 2 means?", "x = x + 2", "x = x * 2", "x = 2", 1]]
  },
  {
    title: "Type Casting", type: "VARIABLES", desc: "Change types.",
    concept: "Convert one type to another like int('5').",
    analogy: "Pouring water into a new shape.",
    code: "num = int('5') + 1",
    quiz: [["int('1.5') works?", "No, error", "Yes, 1", "Yes, 2", 0]]
  },

  // 3. STRINGS (21-30)
  {
    title: "Concatenation", type: "STRINGS", desc: "Glue strings.",
    concept: "Using + to join strings.",
    analogy: "Taping words together.",
    code: "msg = 'Hi ' + 'Tom'",
    quiz: [["'A' + 'B' is?", "'A B'", "'AB'", "Error", 1]]
  },
  {
    title: "String Multiply", type: "STRINGS", desc: "Repeat text.",
    concept: "Using * repeats a string.",
    analogy: "Echo echo echo.",
    code: "laugh = 'Ha' * 3",
    quiz: [["'No' * 2 is?", "'No2'", "'NoNo'", "Error", 1]]
  },
  {
    title: "F-Strings", type: "STRINGS", desc: "Formatted strings.",
    concept: "Put variables inside strings using f''.",
    analogy: "Filling in blanks.",
    code: "name = 'Jo'\nmsg = f'Hi {name}'",
    quiz: [["Which is correct?", "f'Hi {name}'", "'Hi {name}'", "f'Hi name'", 0]]
  },
  {
    title: "Indexing", type: "STRINGS", desc: "Pick a letter.",
    concept: "Get character at position [i]. Starts at 0.",
    analogy: "First item is #0.",
    code: "s = 'Python'\nfirst = s[0]",
    quiz: [["Index of first char?", "1", "0", "-1", 1]]
  },
  {
    title: "Negative Index", type: "STRINGS", desc: "Count back.",
    concept: "[-1] gets the last character.",
    analogy: "Going to end of line.",
    code: "last = 'Code'[-1] # 'e'",
    quiz: [["'Hi'[-1] is?", "'H'", "'i'", "Error", 1]]
  },
  {
    title: "Slicing", type: "STRINGS", desc: "Cut a piece.",
    concept: "[start:end] gets a part of string.",
    analogy: "Cutting a slice of cake.",
    code: "sub = 'Python'[0:2] # 'Py'",
    quiz: [["'ABC'[0:1] is?", "'A'", "'AB'", "'ABC'", 0]]
  },
  {
    title: "Length", type: "STRINGS", desc: "How long?",
    concept: "len() counts characters.",
    analogy: "Measuring tape.",
    code: "size = len('Hi') # 2",
    quiz: [["len('') is?", "0", "1", "Null", 0]]
  },
  {
    title: "Lower/Upper", type: "STRINGS", desc: "Case change.",
    concept: ".lower() and .upper() change case.",
    analogy: "Whispering or Shouting.",
    code: "yell = 'hi'.upper()",
    quiz: [["'A'.lower() is?", "'a'", "'A'", "Error", 0]]
  },
  {
    title: "Strip", type: "STRINGS", desc: "Clean edges.",
    concept: ".strip() removes whitespace from ends.",
    analogy: "Trimming the crust.",
    code: "clean = '  Hi  '.strip()",
    quiz: [["' a '.strip() is?", "' a '", "'a'", "'a '", 1]]
  },
  {
    title: "Replace", type: "STRINGS", desc: "Swap words.",
    concept: ".replace(old, new) swaps text.",
    analogy: "Find and Replace.",
    code: "fix = 'Bad'.replace('B', 'D')",
    quiz: [["Does replace change original?", "No, returns new", "Yes", "Both", 0]]
  },

  // 4. LOGIC & CONDITIONS (31-40)
  {
    title: "Equality (==)", type: "LOGIC", desc: "Same same?",
    concept: "Checks if two values are equal.",
    analogy: "Matching socks.",
    code: "5 == 5 # True",
    quiz: [["'5' == 5 is?", "True", "False", "Error", 1]]
  },
  {
    title: "Not Equal (!=)", type: "LOGIC", desc: "Different?",
    concept: "Checks if values are different.",
    analogy: "Apples vs Oranges.",
    code: "5 != 3 # True",
    quiz: [["10 != 10 is?", "True", "False", "Error", 1]]
  },
  {
    title: "Greater/Less", type: "LOGIC", desc: "Compare size.",
    concept: "> means greater, < means less.",
    analogy: "Big fish eats small fish.",
    code: "10 > 5 # True",
    quiz: [["3 < 1 is?", "True", "False", "Maybe", 1]]
  },
  {
    title: "And", type: "LOGIC", desc: "Both true.",
    concept: "True only if BOTH sides are true.",
    analogy: "Password AND Username correct.",
    code: "True and True # True",
    quiz: [["True and False is?", "True", "False", "Null", 1]]
  },
  {
    title: "Or", type: "LOGIC", desc: "One true.",
    concept: "True if AT LEAST ONE side is true.",
    analogy: "Cash OR Credit.",
    code: "True or False # True",
    quiz: [["False or False is?", "True", "False", "Null", 1]]
  },
  {
    title: "Not", type: "LOGIC", desc: "Flip it.",
    concept: "Flips True to False and vice versa.",
    analogy: "Opposite day.",
    code: "not True # False",
    quiz: [["not False is?", "True", "False", "Null", 0]]
  },
  {
    title: "If Statement", type: "CONDITIONS", desc: "Decide.",
    concept: "Run code only if condition is True.",
    analogy: "If rain, take umbrella.",
    code: "if raining:\n  take_umbrella()",
    quiz: [["Needs a colon : ?", "Yes", "No", "Sometimes", 0]]
  },
  {
    title: "Indentation", type: "CONDITIONS", desc: "Spacing matter.",
    concept: "Python uses indentation to group code blocks.",
    analogy: " organizing an outline.",
    code: "if True:\n    print('Inside')",
    quiz: [["Is indentation mandatory?", "Yes", "No", "Only for style", 0]]
  },
  {
    title: "Else", type: "CONDITIONS", desc: "Otherwise.",
    concept: "Runs if the 'if' condition was False.",
    analogy: "Else, wear sunglasses.",
    code: "if rain:\n  pass\nelse:\n  print('Sun')",
    quiz: [["When does else run?", "If True", "If False", "Always", 1]]
  },
  {
    title: "Elif", type: "CONDITIONS", desc: "Else if.",
    concept: "Check another condition if first failed.",
    analogy: "If ice cream? No. Elif cake? Yes.",
    code: "if x > 5: ...\nelif x > 2: ...",
    quiz: [["Can have multiple elifs?", "Yes", "No", "Max 1", 0]]
  },

  // 5. LOOPS (41-50)
  {
    title: "For Loops", type: "LOOPS", desc: "Repeat steps.",
    concept: "Iterate over a sequence.",
    analogy: "Checking every item on a list.",
    code: "for item in list:\n  print(item)",
    quiz: [["Keyword for loops?", "loop", "for", "repeat", 1]]
  },
  {
    title: "Range()", type: "LOOPS", desc: "Count numbers.",
    concept: "Generates a sequence of numbers.",
    analogy: "Counting fingers.",
    code: "for i in range(5):\n  print(i)",
    quiz: [["range(3) gives?", "0,1,2", "1,2,3", "0,1,2,3", 0]]
  },
  {
    title: "Range Start/Stop", type: "LOOPS", desc: "Custom count.",
    concept: "range(start, stop) - stops before 'stop'.",
    analogy: "Read pages 10 to 20.",
    code: "range(1, 4) # 1, 2, 3",
    quiz: [["range(2, 5) length?", "2", "3", "4", 1]]
  },
  {
    title: "Range Step", type: "LOOPS", desc: "Skip count.",
    concept: "range(start, stop, step).",
    analogy: "Counting by 2s.",
    code: "range(0, 10, 2) # 0,2,4,6,8",
    quiz: [["range(0, 6, 3)?", "0, 3", "0, 3, 6", "3, 6", 0]]
  },
  {
    title: "While Loop", type: "LOOPS", desc: "Wait until.",
    concept: "Repeats as long as condition is True.",
    analogy: "While hungry, eat.",
    code: "while x > 0:\n  x -= 1",
    quiz: [["Danger of while loops?", "Too fast", "Infinite loop", "None", 1]]
  },
  {
    title: "Break", type: "LOOPS", desc: "Stop now.",
    concept: "Exits the loop immediately.",
    analogy: "Emergency stop button.",
    code: "if tired:\n  break",
    quiz: [["Does break stop loop?", "Yes", "No", "Pauses", 0]]
  },
  {
    title: "Continue", type: "LOOPS", desc: "Skip one.",
    concept: "Skips rest of current loop and goes to next.",
    analogy: "Skip song.",
    code: "if bad_song:\n  continue",
    quiz: [["Does continue exit loop?", "No", "Yes", "Maybe", 0]]
  },
  {
    title: "Pass", type: "LOOPS", desc: "Do nothing.",
    concept: "A placeholder that does nothing.",
    analogy: "This page intentionally left blank.",
    code: "if True:\n  pass",
    quiz: [["Does pass stop code?", "No", "Yes", "Errors", 0]]
  },
  {
    title: "Nested Loop", type: "LOOPS", desc: "Loop inside loop.",
    concept: "A loop inside another loop.",
    analogy: "Clock: Minutes loop inside Hours.",
    code: "for x in rows:\n  for y in cols:",
    quiz: [["Inner loop runs?", "Once", "Many times", "Never", 1]]
  },
  {
    title: "Loop Else", type: "LOOPS", desc: "Done.",
    concept: "Else block runs after loop finishes (unless break).",
    analogy: "Dessert after dinner.",
    code: "for i in range(3): ...\nelse: print('Done')",
    quiz: [["Runs if break used?", "No", "Yes", "Sometimes", 0]]
  },

  // 6. LISTS (51-60)
  {
    title: "Create List", type: "LISTS", desc: "Collection.",
    concept: "Store multiple items in [] brackets.",
    analogy: "A shopping cart.",
    code: "cart = ['Apple', 'Milk']",
    quiz: [["Brackets for list?", "{}", "()", "[]", 2]]
  },
  {
    title: "Access Item", type: "LISTS", desc: "Grab one.",
    concept: "Use index to get item.",
    analogy: " grabbing item from shelf 0.",
    code: "item = cart[0]",
    quiz: [["First index is?", "1", "0", "-1", 1]]
  },
  {
    title: "Change Item", type: "LISTS", desc: "Swap.",
    concept: "Assign new value to index.",
    analogy: "Swapping an apple for an orange.",
    code: "cart[0] = 'Orange'",
    quiz: [["Are lists mutable?", "Yes", "No", "Sometimes", 0]]
  },
  {
    title: "Append", type: "LISTS", desc: "Add to end.",
    concept: ".append(item) adds to end.",
    analogy: "Adding to cart.",
    code: "cart.append('Bread')",
    quiz: [["Where does append add?", "Start", "End", "Random", 1]]
  },
  {
    title: "Insert", type: "LISTS", desc: "Squeeze in.",
    concept: ".insert(index, item) adds at position.",
    analogy: "Cutting in line.",
    code: "cart.insert(0, 'Candy')",
    quiz: [["Arguments needed?", "Item", "Index, Item", "None", 1]]
  },
  {
    title: "Pop", type: "LISTS", desc: "Remove last.",
    concept: ".pop() removes and returns last item.",
    analogy: "Taking off the top.",
    code: "item = cart.pop()",
    quiz: [["pop(0) removes?", "First", "Last", "All", 0]]
  },
  {
    title: "Remove", type: "LISTS", desc: "Delete specific.",
    concept: ".remove(value) deletes first match.",
    analogy: "Throwing away the milk.",
    code: "cart.remove('Milk')",
    quiz: [["If item not found?", "Nothing", "Error", "Removes last", 1]]
  },
  {
    title: "Sort", type: "LISTS", desc: "Order it.",
    concept: ".sort() organizes the list.",
    analogy: "Alphabetizing books.",
    code: "nums.sort()",
    quiz: [["Sorts numbers how?", "Low to High", "High to Low", "Random", 0]]
  },
  {
    title: "List Length", type: "LISTS", desc: "How many?",
    concept: "len(list) gives count.",
    analogy: "Counting heads.",
    code: "count = len(cart)",
    quiz: [["Return type?", "int", "str", "list", 0]]
  },
  {
    title: "Slicing Lists", type: "LISTS", desc: "Sub-list.",
    concept: "list[start:end] gets a part.",
    analogy: "Taking a section of seats.",
    code: "top3 = scores[0:3]",
    quiz: [["Original list changes?", "No", "Yes", "Maybe", 0]]
  },

  // 7. TUPLES & SETS (61-70)
  {
    title: "Tuples", type: "LISTS", desc: "Fixed list.",
    concept: "Tuples use () and cannot change.",
    analogy: "Engraved stone list.",
    code: "point = (10, 20)",
    quiz: [["Brackets for tuple?", "[]", "()", "{}", 1]]
  },
  {
    title: "Tuple Immutable", type: "LISTS", desc: "No changing.",
    concept: "You cannot add/remove items.",
    analogy: "Read-only file.",
    code: "t[0] = 5 # Error!",
    quiz: [["Can you append to tuple?", "Yes", "No", "If empty", 1]]
  },
  {
    title: "Unpacking", type: "LISTS", desc: "Extract.",
    concept: "Assign variables from tuple.",
    analogy: "Unpacking a suitcase.",
    code: "x, y = (10, 20)",
    quiz: [["x equals?", "10", "20", "(10,20)", 0]]
  },
  {
    title: "Sets", type: "LISTS", desc: "Unique collection.",
    concept: "Sets use {} and have no duplicates.",
    analogy: "A bag of unique marbles.",
    code: "nums = {1, 2, 2} # {1, 2}",
    quiz: [["Does set keep order?", "No", "Yes", "Usually", 0]]
  },
  {
    title: "Set Add", type: "LISTS", desc: "Add item.",
    concept: ".add() adds item if not there.",
    analogy: "Collecting stamps.",
    code: "s.add(5)",
    quiz: [["Adding duplicate does?", "Nothing", "Error", "Adds again", 0]]
  },
  {
    title: "Union", type: "LISTS", desc: "Combine.",
    concept: "Combine two sets.",
    analogy: "Mixing two groups.",
    code: "all = s1 | s2",
    quiz: [["Duplicates in union?", "Removed", "Kept", "Error", 0]]
  },
  {
    title: "Intersection", type: "LISTS", desc: "Overlap.",
    concept: "Items in both sets.",
    analogy: "Friends in common.",
    code: "common = s1 & s2",
    quiz: [["Operator for intersection?", "&", "|", "-", 0]]
  },
  {
    title: "Difference", type: "LISTS", desc: "Subtract.",
    concept: "Items in A but not B.",
    analogy: "My toys vs Your toys.",
    code: "mine = s1 - s2",
    quiz: [["Operator?", "-", "+", "*", 0]]
  },
  {
    title: "In Keyword", type: "LOGIC", desc: "Exists?",
    concept: "Check if item is in collection.",
    analogy: "Is 'Waldo' in crowd?",
    code: "if 5 in nums:",
    quiz: [["Result type?", "Boolean", "Int", "String", 0]]
  },
  {
    title: "List to Set", type: "LISTS", desc: "Remove dupes.",
    concept: "set(list) removes duplicates.",
    analogy: "Filtering repeating songs.",
    code: "u = set([1,1,2]) # {1,2}",
    quiz: [["Easy way to unique?", "set()", "unique()", "clean()", 0]]
  },

  // 8. DICTIONARIES (71-80)
  {
    title: "Dictionaries", type: "DICTIONARIES", desc: "Key-Value.",
    concept: "Store data in key:value pairs using {}.",
    analogy: "A real dictionary (Word -> Meaning).",
    code: "d = {'name': 'Zed'}",
    quiz: [["Brackets?", "[]", "()", "{}", 2]]
  },
  {
    title: "Access Value", type: "DICTIONARIES", desc: "Get by key.",
    concept: "Use [key] to get value.",
    analogy: "Looking up a definition.",
    code: "n = d['name']",
    quiz: [["Access by index?", "No", "Yes", "Sometimes", 0]]
  },
  {
    title: "Add/Update", type: "DICTIONARIES", desc: "Change it.",
    concept: "d[key] = value adds or updates.",
    analogy: "Writing a new entry.",
    code: "d['age'] = 10",
    quiz: [["If key exists?", "Updates", "Errors", "Adds duplicate", 0]]
  },
  {
    title: "Get Method", type: "DICTIONARIES", desc: "Safe access.",
    concept: ".get(key) returns None if missing.",
    analogy: "Polite request.",
    code: "d.get('color')",
    quiz: [["Prevents what?", "Crash/KeyError", "Slow code", "Nothing", 0]]
  },
  {
    title: "Keys", type: "DICTIONARIES", desc: "List labels.",
    concept: ".keys() gets all keys.",
    analogy: "Table of contents.",
    code: "k = d.keys()",
    quiz: [["Returns?", "List of keys", "List of values", "None", 0]]
  },
  {
    title: "Values", type: "DICTIONARIES", desc: "List data.",
    concept: ".values() gets all values.",
    analogy: "All the definitions.",
    code: "v = d.values()",
    quiz: [["Returns keys?", "No", "Yes", "Both", 0]]
  },
  {
    title: "Items", type: "DICTIONARIES", desc: "Both.",
    concept: ".items() gets pairs.",
    analogy: "Full pages.",
    code: "for k,v in d.items():",
    quiz: [["Returns?", "Key-Value pairs", "Keys", "Values", 0]]
  },
  {
    title: "Pop Dict", type: "DICTIONARIES", desc: "Remove key.",
    concept: ".pop(key) removes item.",
    analogy: "Tearing out a page.",
    code: "d.pop('name')",
    quiz: [["Argument needed?", "Key", "Value", "Index", 0]]
  },
  {
    title: "Nested Dict", type: "DICTIONARIES", desc: "Dict in Dict.",
    concept: "Values can be other dictionaries.",
    analogy: "Folder inside folder.",
    code: "user = {'id': {'a': 1}}",
    quiz: [["Access 'a'?", "user['id']['a']", "user['a']", "Error", 0]]
  },
  {
    title: "Clear", type: "DICTIONARIES", desc: "Empty it.",
    concept: ".clear() removes everything.",
    analogy: "Erasing the whiteboard.",
    code: "d.clear()",
    quiz: [["Size after clear?", "0", "1", "-1", 0]]
  },

  // 9. FUNCTIONS & MODULES (81-90)
  {
    title: "Functions", type: "FUNCTIONS", desc: "Define code.",
    concept: "def keyword creates a function.",
    analogy: "Recipe card.",
    code: "def greet():\n  print('Hi')",
    quiz: [["Keyword?", "func", "def", "function", 1]]
  },
  {
    title: "Call Function", type: "FUNCTIONS", desc: "Run it.",
    concept: "Use name() to run.",
    analogy: "Cooking the recipe.",
    code: "greet()",
    quiz: [["Missing ()?", "Nothing happens", "Runs", "Error", 0]]
  },
  {
    title: "Parameters", type: "FUNCTIONS", desc: "Inputs.",
    concept: "Variables inside () definition.",
    analogy: "Ingredients slot.",
    code: "def add(a, b):",
    quiz: [["a and b are?", "Params", "Args", "Globals", 0]]
  },
  {
    title: "Return", type: "FUNCTIONS", desc: "Output.",
    concept: "Sends value back to caller.",
    analogy: "Serving the dish.",
    code: "return a + b",
    quiz: [["Stops function?", "Yes", "No", "Pauses", 0]]
  },
  {
    title: "Default Args", type: "FUNCTIONS", desc: "Backups.",
    concept: "Values used if missing.",
    analogy: "Default cheese is Cheddar.",
    code: "def eat(food='Apple'):",
    quiz: [["eat() uses?", "'Apple'", "None", "Error", 0]]
  },
  {
    title: "Modules", type: "MODULES", desc: "Toolboxes.",
    concept: "import brings in external code.",
    analogy: "Borrowing a toolset.",
    code: "import math",
    quiz: [["Keyword?", "import", "using", "include", 0]]
  },
  {
    title: "Math Module", type: "MODULES", desc: "Math tools.",
    concept: "Standard math functions.",
    analogy: "Advanced calculator.",
    code: "import math\npi = math.pi",
    quiz: [["math.sqrt(9)?", "3.0", "9", "81", 0]]
  },
  {
    title: "Random Module", type: "MODULES", desc: "Luck.",
    concept: "Generate random numbers.",
    analogy: "Dice roll.",
    code: "import random\nrandom.randint(1,6)",
    quiz: [["Is it predictable?", "No", "Yes", "Always 1", 0]]
  },
  {
    title: "From Import", type: "MODULES", desc: "Specific tool.",
    concept: "from X import Y.",
    analogy: "Just taking the hammer.",
    code: "from math import pi",
    quiz: [["Need math.pi prefix?", "No", "Yes", "Maybe", 0]]
  },
  {
    title: "Aliasing", type: "MODULES", desc: "Nicknames.",
    concept: "import X as Y.",
    analogy: "Calling Robert 'Bob'.",
    code: "import pandas as pd",
    quiz: [["Keyword?", "as", "like", "alias", 0]]
  },

  // 10. ERRORS & ADVANCED (91-100)
  {
    title: "Try / Except", type: "FILES", desc: "Catch errors.",
    concept: "Handle errors gracefully.",
    analogy: "Safety net.",
    code: "try:\n  1/0\nexcept:\n  print('Oops')",
    quiz: [["Does code crash?", "No", "Yes", "Maybe", 0]]
  },
  {
    title: "Finally", type: "FILES", desc: "Always run.",
    concept: "Runs no matter what.",
    analogy: "Cleaning up.",
    code: "finally:\n  close()",
    quiz: [["Runs on error?", "Yes", "No", "Only success", 0]]
  },
  {
    title: "Scope", type: "FUNCTIONS", desc: "Visibility.",
    concept: "Where variables live.",
    analogy: "House rules vs World rules.",
    code: "x = 1 # Global",
    quiz: [["Inside func variable is?", "Local", "Global", "Universal", 0]]
  },
  {
    title: "Global", type: "FUNCTIONS", desc: "World access.",
    concept: "global keyword modifies global var.",
    analogy: "Megaphone to world.",
    code: "global x",
    quiz: [["Keyword?", "global", "outer", "world", 0]]
  },
  {
    title: "Lambda", type: "FUNCTIONS", desc: "Mini func.",
    concept: "One line anonymous function.",
    analogy: "Instant noodle function.",
    code: "add = lambda x: x+1",
    quiz: [["Keyword?", "lambda", "def", "func", 0]]
  },
  {
    title: "List Comp", type: "LISTS", desc: "Short lists.",
    concept: "Create list in one line.",
    analogy: "Assembly line.",
    code: "[x*2 for x in nums]",
    quiz: [["Brackets?", "[]", "()", "{}", 0]]
  },
  {
    title: "None", type: "LOGIC", desc: "Nothing.",
    concept: "Represents absence of value.",
    analogy: "Empty box.",
    code: "x = None",
    quiz: [["Equivalent to 0?", "No", "Yes", "Maybe", 0]]
  },
  {
    title: "Is", type: "LOGIC", desc: "Identity.",
    concept: "Checks if objects are same memory.",
    analogy: "Are these the same person?",
    code: "x is None",
    quiz: [["Better for None check?", "is", "==", "=", 0]]
  },
  {
    title: "Dir()", type: "MODULES", desc: "Look inside.",
    concept: "dir(obj) lists attributes.",
    analogy: "X-ray specs.",
    code: "dir(str)",
    quiz: [["Shows?", "Attributes", "Values", "Memory", 0]]
  },
  {
    title: "Help()", type: "MODULES", desc: "Manual.",
    concept: "help() prints docs.",
    analogy: "Instruction manual.",
    code: "help(print)",
    quiz: [["Built-in?", "Yes", "No", "Need import", 0]]
  }
];

// --- GENERATOR FUNCTION ---

const generateCurriculum = (): TopicData[] => {
  return RAW_TOPICS.map((topic, index) => {
    // Pick a random theme for the story to keep it fresh
    const theme = THEMES[index % THEMES.length];
    
    // Construct the TopicData object
    return {
      id: `topic-${index + 1}-${topic.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      type: topic.type,
      title: `${index + 1}. ${topic.title}`,
      description: topic.desc,
      iconName: ICONS[topic.type] || 'Code',
      color: COLORS[topic.type] || 'bg-gray-500',
      codeSnippet: topic.code,
      conceptContent: {
        text: topic.concept,
        analogy: topic.analogy,
        // Use placeholder images that look vaguely techy/colorful
        imageUrl: `https://picsum.photos/seed/${topic.title.replace(' ', '')}/600/400`
      },
      gameStory: {
        title: `${theme.name} Mission`,
        scenario: `You are a ${theme.role}. Your goal is to ${theme.goal}.`,
        instruction: `Use the power of ${topic.title} to collect ${theme.item}!`,
        visualCues: [theme.name, topic.title, "Success"]
      },
      quiz: topic.quiz.map((q, qIdx) => ({
        id: qIdx,
        question: q[0] as string,
        options: [q[1], q[2], q[3]] as string[],
        correctIndex: q[4] as number
      }))
    };
  });
};

export const CURRICULUM: TopicData[] = generateCurriculum();