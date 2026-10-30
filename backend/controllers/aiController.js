import { db } from '../config/db.js';

export const chatWithAI = async (req, res) => {
    try {
        const { message } = req.body;
        const lowMsg = message.toLowerCase().trim();

        // 1. Check for product-related queries
        const machines = await db.all('SELECT name, description, category_id FROM products');
        const categories = await db.all('SELECT name FROM categories');

        let foundProducts = [];
        machines.forEach(p => {
            if (lowMsg.includes(p.name.toLowerCase())) {
                foundProducts.push(p);
            }
        });

        if (foundProducts.length > 0) {
            const prod = foundProducts[0];
            const response = `Jee haan, humare paas ${prod.name} available hai. \n\nDetails: ${prod.description}\n\nKya aap Iska quotation chahte hain? Aap humein +91 95584 83100 par call kar sakte hain.`;
            return res.json({ reply: response });
        }

        // 2. Check for category related queries
        let foundCategory = categories.find(c => lowMsg.includes(c.name.toLowerCase()));
        if (foundCategory) {
            const catProducts = await db.all(`
                SELECT p.name FROM products p 
                JOIN categories c ON p.category_id = c.id 
                WHERE c.name = ?`, [foundCategory.name]);

            const prodList = catProducts.map(p => p.name).join(", ");
            const response = `${foundCategory.name} category mein humare paas ye machines hain: ${prodList}. \n\nAapko kaunsi machine ki details chahiye?`;
            return res.json({ reply: response });
        }

        // 3. General Knowledge Base (Expanded)
        const kb = [
            {
                keys: ["hi", "hello", "hey", "namaste", "pranam"],
                reply: "Namaste! Main Bhama Industrial AI Assistant hoon. Main aapki Pharma aur Cosmetic machinery choose karne mein madad kar sakta hoon. Aap kya dhund rahe hain?"
            },
            {
                keys: ["contact", "call", "phone", "number", "email", "address", "location"],
                reply: "Aap humein yahan contact kar sakte hain:\n📞 Sales: +91 95584 83100\n📧 Email: bhamasind@gmail.com\n📍 Ahmedabad, Gujarat."
            },
            {
                keys: ["price", "cost", "how much", "rate", "daam", "kimat"],
                reply: "Machines ki price configuration aur capacity par depend karti hai. Best price aur quotation ke liye kripya apna number share karein ya humein +91 95584 83100 par WhatsApp karein."
            },
            {
                keys: ["brochure", "pdf", "catalogue", "catalog", "download"],
                reply: "Aap hamara technical catalogue website ke 'Brochure' section se download kar sakte hain. Kya main aapke liye download link dhundu?"
            },
            {
                keys: ["export", "outside india", "international", "abroad"],
                reply: "Yes, Bhama Industries exports to 30+ countries including USA, Africa, and Middle East. Hum global shipping aur installation support dete hain."
            },
            {
                keys: ["spare", "parts", "service", "maintenance", "repair"],
                reply: "Hum saari machines ke spare parts (SS 316L quality) provide karte hain. 24x7 service support bhi available hai."
            }
        ];

        for (const item of kb) {
            if (item.keys.some(k => lowMsg.includes(k))) {
                return res.json({ reply: item.reply });
            }
        }

        // 4. Default dynamic fallback
        res.json({
            reply: "Mujhe khed hai, main iske baare mein zyada nahi jaanta. Lekin hamare experts aapki madad kar sakte hain. Aap +91 95584 83100 par call kar sakte hain ya apna query yahan type karein."
        });

    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({ reply: "Maaf kijiye, system mein kuch takniki kharabi hai. Kripya thodi der baad koshish karein." });
    }
};
