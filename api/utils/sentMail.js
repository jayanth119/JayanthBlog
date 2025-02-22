import nodemailer from "nodemailer"; 
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

// Function to send blog update emails
export const sendBlogUpdateEmail = async (blogTitle, blogUrl, blogExcerpt) => {
    try {
        // Fetch users from the database
        const users = await User.find({}, 'username email');

        if (users.length === 0) {
            console.log("No users found.");
            return;
        }

        // Create a transporter
        let transporter = nodemailer.createTransport({
            service: "gmail",
auth: {
    user: "jayanthunofficial@gmail.com", // Your email
    pass: "qxhx qwhd aobk xgqf" // Your email password or app password
}
        });

        // Email content function
        const emailHTML = (name, blogTitle, blogUrl, blogExcerpt) => `
            <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9; text-align: center;">
                <img src="https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif" alt="New Blog GIF" style="width: 100%; max-width: 400px; border-radius: 10px; margin-bottom: 20px;">
                <h2 style="color: #333;">🚀 A New Blog is Here, ${name}!</h2>
                <p style="color: #555; font-size: 16px;">Exciting news! A fresh blog post just dropped on <strong>JayanthBlog&Thoughts</strong>. 🎉</p>
                <h3 style="color: #007bff;">${blogTitle}</h3>
                <p style="color: #777; font-size: 14px; padding: 0 20px;">"${blogExcerpt}..."</p>
                <a href="${blogUrl}" 
                    style="display: inline-block; padding: 12px 25px; margin-top: 15px; text-decoration: none; background-color: #ff6f61; color: #fff; font-weight: bold; border-radius: 8px;">
                    📖 Read More
                </a>
                <p style="color: #aaa; font-size: 12px; margin-top: 20px;">You're receiving this email because you're subscribed to our blog updates.</p>
            </div>
        `;

        // Send emails in bulk
        const emailPromises = users.map(user => {
            return transporter.sendMail({
                from: `"JayanthBlog&Thoughts" <${process.env.EMAIL}>`,
                to: user.email,
                subject: `🚀 New Blog: ${blogTitle}`,
                html: emailHTML(user.username, blogTitle, blogUrl, blogExcerpt)
            });
        });

        // Execute all email sends in parallel
        await Promise.all(emailPromises);
        console.log("Emails sent successfully to all users!");
    } catch (error) {
        console.error("Error sending emails:", error);
    }
};

// // Call function with actual blog details
// sendBlogUpdateEmail(
//     "New Blog Post!",
//     "http://localhost:5173/portfolio",
//     "This is a short excerpt from the blog..."
// );


