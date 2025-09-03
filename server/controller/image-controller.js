import File from "../models/file.js";

export const uploadImage = async (request, response) => {
    try {
        if (!request.file) {
            return response.status(400).json({ error: "No file uploaded" });
        }

        const fileObj = {
            path: request.file.path,
            name: request.file.originalname,
        };

        const file = await File.create(fileObj);

        // ✅ Base URL env se lo (Render pe localhost mat use karo)
        const fileUrl = `${process.env.BASE_URL}/file/${file._id}`;

        response.status(200).json({ path: fileUrl });
    } catch (error) {
        console.error("Upload error:", error.message);
        response.status(500).json({ error: "Error while uploading file" });
    }
};

export const downloadImage = async (request, response) => {
    try {
        const file = await File.findById(request.params.fileId);

        if (!file) {
            return response.status(404).json({ error: "File not found" });
        }

        file.downloadContent++;
        await file.save();

        response.download(file.path, file.name);
    } catch (error) {
        console.error("Download error:", error.message);
        return response.status(500).json({ error: "Error while downloading file" });
    }
};
