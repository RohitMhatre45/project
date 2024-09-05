require("dotenv").config();
const express = require("express");
const router = new express.Router();
const nodemailer = require("nodemailer");

router.post("/send-confirmation", (req, res) => {
    const { email } = req.body;
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Book-Shelf:   Thank you for your purchase!",
            html: `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Your Order</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333;
            text-align: center;
        }

        p {
            color: #666;
            line-height: 1.6;
        }

        .thanks {
            text-align: center;
            font-size: 18px;
            color: #4caf50;
        }

        .animation {
            width: 50px;
            height: 50px;
            background-color: #4caf50;
            border-radius: 50%;
            animation: pulse 1s infinite;
            margin: 20px auto;
        }

        .message {
            margin-top: 20px;
            padding: 15px;
            background-color: #e0f7fa;
            border-radius: 8px;
        }

        .message h2 {
            color: #00796b;
            text-align: center;
        }

        .message p {
            color: #00796b;
            line-height: 1.6;
        }

        .additional-content {
            margin-top: 20px;
            padding: 15px;
            background-color: #f9f9f9;
            border-radius: 8px;
        }

        .additional-content h2 {
            color: #333;
            text-align: center;
        }

        .additional-content p {
            color: #666;
            line-height: 1.6;
        }

        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.2);
            }
            100% {
                transform: scale(1);
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Thank You for Your Order!</h1>
        <p class="thanks">We appreciate your business.</p>
        <div class="animation"></div>
        <p>Your order from Book-Shelf has been received and is being processed. You will receive a confirmation email shortly.</p>
        <p>If you have any questions or concerns, feel free to <a href="mailto:support@bookshelf.com">contact us</a>.</p>
        
        <div class="message">
            <h2>Explore Your Favorite Reads!</h2>
            <p>At Book-Shelf, we are committed to providing a curated selection of books that cater to your reading preferences. Enjoy your latest addition, and don't forget to explore our vast collection for more exciting reads.</p>
        </div>

        <div class="additional-content">
            <h2>Discover More Books</h2>
            <p>Browse our online store for more books, including bestsellers, new arrivals, and hidden gems. Happy reading!</p>
        </div>
    </div>
</body>
</html>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error", error);
                res.status(500).json({ status: 500, error: "Failed to send email" });
            } else {
                console.log("Email sent: " + info.response);
                res.status(201).json({ status: 201, info });
            }
        });
    } catch (error) {
        res.status(500).json({ status: 500, error: "Internal Server Error" });
    }
});

module.exports = router;


// const express = require("express");
// const router = new express.Router();
// const nodemailer = require("nodemailer");

// router.post("/register", (req, res) => {
//     const { email } = req.body;
//     try {
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.EMAIL,
//                 pass: process.env.PASSWORD
//             }
//         });
//         const mailOptions = {
//             from: process.env.EMAIL,
//             to: email,
//             subject: "Eco Clothing, Thank you for purchase!",
//             html: `
//             <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Thank You for Your Order</title>
//     <style>
//         body {
//             font-family: Arial, sans-serif;
//             background-color: #f4f4f4;
//             margin: 0;
//             padding: 0;
//         }

//         .container {
//             max-width: 600px;
//             margin: 20px auto;
//             padding: 20px;
//             background-color: #fff;
//             border-radius: 8px;
//             box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//         }

//         h1 {
//             color: #333;
//             text-align: center;
//         }

//         p {
//             color: #666;
//             line-height: 1.6;
//         }

//         .thanks {
//             text-align: center;
//             font-size: 18px;
//             color: #4caf50;
//         }

//         .animation {
//             width: 50px;
//             height: 50px;
//             background-color: #4caf50;
//             border-radius: 50%;
//             animation: pulse 1s infinite;
//             margin: 20px auto;
//         }

//         .sustainability {
//             margin-top: 20px;
//             padding: 15px;
//             background-color: #e0f7fa;
//             border-radius: 8px;
//         }

//         .sustainability h2 {
//             color: #00796b;
//             text-align: center;
//         }

//         .sustainability p {
//             color: #00796b;
//             line-height: 1.6;
//         }

//         .additional-content {
//             margin-top: 20px;
//             padding: 15px;
//             background-color: #f9f9f9;
//             border-radius: 8px;
//         }

//         .additional-content h2 {
//             color: #333;
//             text-align: center;
//         }

//         .additional-content p {
//             color: #666;
//             line-height: 1.6;
//         }

//         @keyframes pulse {
//             0% {
//                 transform: scale(1);
//             }
//             50% {
//                 transform: scale(1.2);
//             }
//             100% {
//                 transform: scale(1);
//             }
//         }
//     </style>
// </head>
// <body>
//     <div class="container">
//         <h1>Thank You for Your Order!</h1>
//         <p class="thanks">We appreciate your business.</p>
//         <div class="animation"></div>
//         <p>Your order from Eco Clothing has been received and is being processed. You will receive a confirmation email shortly.</p>
//         <p>If you have any questions or concerns, feel free to <a href="mailto:support@ecoclothing.com">contact us</a>.</p>
        
//         <div class="sustainability">
//             <h2>Join Us in Promoting Sustainable Fashion!</h2>
//             <p>At Eco Clothing, we are committed to a greener and more sustainable future. By choosing our eco-friendly and ethically produced clothing, you are contributing to a healthier planet.</p>
//             <p>Consider making more eco-conscious choices in your daily life. Small changes can make a big impact. Together, let's create a world where fashion meets responsibility!</p>
//         </div>

//         <div class="additional-content">
//             <h2>Explore Our Latest Collections</h2>
//             <p>Discover more sustainable and stylish options in our latest collections. Browse through our website to find eco-friendly clothing that aligns with your values.</p>
//             <p>Thank you again for choosing Eco Clothing. We look forward to serving you in the future.</p>
//         </div>
//     </div>
// </body>
// </html>


//             `
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.log("Error", error);
//                 res.status(500).json({ status: 500, error: "Failed to send email" });
//             } else {
//                 console.log("Email sent" + info.response);
//                 res.status(201).json({ status: 201, info });
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ status: 500, error: "Internal Server Error" });
//     }
// });

// module.exports = router;
