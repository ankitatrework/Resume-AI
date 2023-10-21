const express = require("express");
const app = express();
const multer = require("multer"); // To handle file uploads
const pdfReader = require("./pdf"); // Import the PDF reading function
const {
  storeChatHistory,
  fetchChatHistory,
  createUser,
  fetchAll,
} = require("./db");
const jobRoutes = require("./routes/jobRoutes");

const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); 
dotenv.config();
  
let openai = null;
let pdfContent = "";
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
const upload = multer();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/job",jobRoutes);


app.listen(port, () => console.log("Server running on port 8080"));

app.post("/read-pdf", upload.single("pdfFile"), async (req, res) => {
  try {
    const pdfFileBuffer = Uint8Array.from(req.file.buffer); // Convert Buffer to Uint8Array
    const textContent = await pdfReader(pdfFileBuffer);
    pdfContent = textContent;
    console.log("PDF text content:", textContent);
    return pdfContent;
    res.status(200).json({ textContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error reading PDF file." });
  }
});

async function extractJobDescription() {
  try {
    const jobListing = await prisma.jobListing.findFirst(); // You can modify this query to fit your needs
    if (jobListing) {
      const jobDescription = jobListing.description;
      console.log('Job Description:', jobDescription);
      return jobDescription;
    } else {
      console.log('No job listings found');
      return null;
    }
  } catch (error) {
    console.error('Error extracting job description:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

const SYSTEM_PROMPT =
"Given the following job description \n\n" = jobDescription
"Your task is to evaluate the provided resume\\nn" = pdfContent
"assigning a score out of 1000 based on the following factors\n"

"Keywords Match: 200\n"
"Education: 150\n"
"Experience: 200\n"
"Job History: 150\n"
"Skills: 150\n"
"Projects: 100\n"
"Achievements: 50\n"

"Please calculate the total score for the resume based on the criteria below and return the result in the following JSON format:"

{
    "score: number"
}

"Keywords Match: The resume matches the keywords mentioned in the job description.\n"
"Education: The resume indicates relevant education for the position.\n"
"Experience: The resume demonstrates relevant work experience.\n"
"Job History: The resume provides a detailed job history.\n"
"Skills: The resume lists applicable skills for the job.\n"
"Projects: The resume highlights relevant projects.\n"
"Achievements: The resume mentions relevant achievements.\n"


"Evaluate the resume honestly and impartially, and return the result only in the JSON format as stated, writing nothing else. ONLY THE JSON\n\n"

  
app.post("/chat", async (req, res) => {
  try {
    const messages = req.body.messages || [];
    messages.push({ role: "system", content: SYSTEM_PROMPT });

    const chat_completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    const botMessage = chat_completion.data.choices[0].message.content;

    console.log(botMessage);

    const responseData = {
      botMessage: botMessage,
    };

    res.send(responseData);
  } catch (error) {
    console.error("Error in /chat endpoint:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/get-api-key", (req, res) => {
  try {
    const { apiKey } = req.body;

    if (!apiKey) {
      return res.status(400).json({ error: "API key is required." });
    }

    // Create a new instance of OpenAIApi with the provided API key
    const configuration = new Configuration({
      apiKey: apiKey,
    });

    // Update the existing openai instance with the new configuration
    openai = new OpenAIApi(configuration);

    res.status(200).json({ message: "API key received successfully." });
  } catch (error) {
    console.error("Error in /get-api-key endpoint:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/createUser", async (req, res) => {
  try {
    const { userName } = req.body;
    if (!userName) {
      return res.status(400).json({ error: "Username is required." });
    }
    const result = await createUser(userName);

    if (!result) {
      return res.status(400).json({ error: "Username already exists." });
    }
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in /createUser endpoint:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/store", (req, res) => {
  try {
    const { userId, description, chatHistory } = req.body;

    if (!userId || !description || !chatHistory) {
      return res
        .status(400)
        .json({ error: "userId, description and chatHistory are required." });
    }

    storeChatHistory(userId, description, chatHistory)
      .then((newChatHistory) => {
        res.status(200).json({ message: "Chat history stored successfully." });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Error storing chat history." });
      });
  } catch (error) {
    console.error("Error in /store endpoint:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/content", (req, res) => {
  try {
    const { userId } = req.body;
    fetchChatHistory(userId)
      .then((chatHistory) => {
        console.log("Chat history retrieved:", chatHistory);
        res.status(200).json({ chatHistory });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Error fetching chat history." });
      });
  } catch (error) {
    console.error("Error in /content endpoint:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/getall", (req, res) => {
  try {
    fetchAll()
      .then((chatHistory) => {
        console.log("Chat history retrieved:", chatHistory);
        res.status(200).json({ chatHistory });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Error fetching chat history." });
      });
  } catch (error) {
    console.error("Error in /all endpoint:", error.message);
    res.status(500).send("Internal Server Error");
  }
});
