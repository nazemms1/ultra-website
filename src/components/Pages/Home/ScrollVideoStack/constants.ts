export const SCROLL_VIDEO_SRC = '/videos/bg-video.webm'

/** Pre-extracted frames — crossfade between them removes decode lag during scroll. */
export const SCROLL_VIDEO_FRAME_COUNT = 36

/** Cap extraction width to keep memory and decode time reasonable. */
export const SCROLL_VIDEO_MAX_FRAME_WIDTH = 960

/** Device pixel ratio cap for the display canvas. */
export const SCROLL_VIDEO_MAX_DPR = 2
