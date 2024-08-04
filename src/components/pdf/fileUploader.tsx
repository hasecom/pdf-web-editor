// src/components/FileUpload.tsx
import React, { useState } from 'react';
import { Button } from '@mui/material';

const FileUpload: React.FC<{ onUpload: (url: string) => void }> = ({ onUpload }) => {
	const [file, setFile] = useState<File | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setFile(event.target.files[0]);
		}
	};

	const handleUpload = async () => {
		if (!file) return;

		const formData = new FormData();
		formData.append('file', file);

		try {
			const response = await fetch('/api/pdf/upload', {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			onUpload(data.url);
		} catch (error) {
			console.error('Error uploading file:', error);
		}
	};

	return (
		<>
			<label htmlFor="file-upload">Choose a file:</label>
			<input type="file" id="file-upload" onChange={handleFileChange} />
			<Button variant="contained" color="primary" onClick={handleUpload}>
				Upload
			</Button>
		</>
	);
};

export default FileUpload;
