'use client'
import { Box } from "@mui/material";
import { usePdfObjectContext } from "@/provider/pdfObjectProvider";

const PdfOverlapView = () => {
    const { pdfObject } = usePdfObjectContext();
    
    return (
        <>
            {pdfObject.map((item: any, index: any) => (
                <Box key={index}>
                    <item.template />
                </Box>
            ))}
        </>
    )
}
export default PdfOverlapView;