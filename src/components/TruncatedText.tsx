import React from 'react';
import { Typography, Tooltip, TypographyProps } from '@mui/material';

interface TruncatedTextProps extends TypographyProps {
  text: string;
  maxLines?: number;
  tooltipThreshold?: number;
  maxWidth?: number;
}

export const TruncatedText: React.FC<TruncatedTextProps> = ({
  text,
  maxLines = 1,
  tooltipThreshold = 50,
  maxWidth,
  ...typographyProps
}) => {
  const isTextTruncated = text.length > tooltipThreshold;

  const truncationStyles = maxLines === 1
    ? {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap' as const,
        ...(maxWidth && { maxWidth }),
      }
    : {
        display: '-webkit-box',
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical' as const,
        overflow: 'hidden',
        ...(maxWidth && { maxWidth }),
      };

  return (
    <Tooltip title={text} disableHoverListener={!isTextTruncated}>
      <Typography {...typographyProps} sx={{ ...truncationStyles, ...typographyProps.sx }}>
        {text}
      </Typography>
    </Tooltip>
  );
};
