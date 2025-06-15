import { OutputBlockData } from "@editorjs/editorjs";

export const image = ({ data }: OutputBlockData): string => {
  const url = data.file?.url || data.url || "";
  const caption = data.caption || "";
  const isCaptionBlank = !caption || caption.trim() === "";

  return `<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" style="padding-top:20px;${isCaptionBlank ? "padding-bottom:20px;" : "padding-bottom:5px;"}">
          <img 
            src="${url}" 
            alt="${caption}" 
            width="500" 
            height="auto" 
            style="display:block; max-width:500px; width:100%; height:auto; border:0; outline:none; text-decoration:none;" 
          />
        </td>
      </tr>
      ${
        !isCaptionBlank
          ? `<tr>
          <td align="center" style="padding-bottom:20px;">
            <p style="margin:0; font-size:14px; line-height:1; color:#999999; text-align:center;">${caption}</p>
          </td>
        </tr>`
          : ""
      }
    </table>`;
};
