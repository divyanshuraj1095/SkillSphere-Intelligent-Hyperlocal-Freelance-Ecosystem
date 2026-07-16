import axios from "axios";

export async function getEmbedding(text: string) {
    const response = await axios.post(
        "https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2",
        {
            inputs: text
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.HF_TOKEN}`
            }
        }
    );

    return response.data;
}

export function cosineSimilarity(a: number[], b: number[]) {
    let dot = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
    }

    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}