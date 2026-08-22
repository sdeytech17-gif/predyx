import fs from 'fs';

const viewerCss = `.viewerWrapper {
  position: relative;
  width: 100%;
  height: 560px;
  min-height: 480px;
  background: radial-gradient(circle at 50% 45%, #253142 0%, #1a2230 65%, #121822 100%);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45), inset 0 0 60px rgba(0, 0, 0, 0.25);
  user-select: none;
}

@media (min-width: 1024px) {
  .viewerWrapper {
    height: 600px;
  }
}

.canvas3d {
  width: 100%;
  height: 100%;
  display: block;
  touch-action: none;
  cursor: grab;
}

.canvas3d:active {
  cursor: grabbing;
}

.canvas3d:focus-visible {
  outline: 2px solid var(--color-amber);
  outline-offset: -2px;
}

.hudHeader {
  position: absolute;
  top: var(--space-3);
  left: var(--space-4);
  right: var(--space-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
  z-index: 5;
}

.hudBadge {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 4px var(--space-3);
  background-color: rgba(26, 34, 48, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-full);
  backdrop-filter: blur(10px);
}

.liveIndicator {
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
  background-color: var(--color-success);
  box-shadow: 0 0 8px var(--color-success);
}

.hudTitle {
  font-family: var(--font-mono, monospace);
  font-size: var(--text-tele-xs);
  color: var(--color-text-primary);
  letter-spacing: var(--tracking-wider);
}

.controlsHelp {
  display: none;
  align-items: center;
  gap: var(--space-1);
  font-family: var(--font-mono, monospace);
  font-size: var(--text-tele-xs);
  color: #94a3b8;
  background-color: rgba(26, 34, 48, 0.82);
  padding: 4px var(--space-3);
  border-radius: var(--radius-full);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

@media (min-width: 640px) {
  .controlsHelp {
    display: flex;
  }
}

.helpIcon {
  color: var(--color-steel);
}

.muscleTooltip {
  position: absolute;
  bottom: calc(var(--space-12) + 16px);
  left: var(--space-4);
  max-width: 320px;
  background-color: rgba(26, 34, 48, 0.95);
  border: 1px solid var(--color-border-amber);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  backdrop-filter: blur(16px);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.6);
  z-index: 10;
  animation: tooltipEnter var(--dur-fast) var(--ease-sharp);
}

@keyframes tooltipEnter {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.tooltipHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-2);
}

.closeTooltip {
  color: var(--color-text-muted);
  font-size: var(--text-tele-xs);
  padding: 2px 6px;
  border-radius: var(--radius-xs);
}

.closeTooltip:hover {
  color: var(--color-text-primary);
  background-color: var(--color-bg-elevated);
}

.tooltipName {
  font-family: var(--font-display, sans-serif);
  font-size: var(--text-label);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.tooltipCue {
  font-size: var(--text-label-sm);
  color: #cbd5e1;
  line-height: 1.45;
}

.legendContainer {
  position: absolute;
  bottom: var(--space-3);
  left: var(--space-4);
  right: var(--space-4);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4);
  background-color: rgba(26, 34, 48, 0.90);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  z-index: 5;
  width: max-content;
  max-width: calc(100% - 32px);
}

.legendItem {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.legendSwatch {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-xs);
}

.swatchAmber {
  background-color: #f59e0b;
  box-shadow: 0 0 8px #f59e0b;
}

.swatchSteel {
  background-color: #0ea5e9;
  box-shadow: 0 0 8px #0ea5e9;
}

.swatchNeutral {
  background-color: #6b7b92;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.legendLabel {
  font-family: var(--font-mono, monospace);
  font-size: var(--text-tele-xs);
  color: #cbd5e1;
  letter-spacing: var(--tracking-wider);
  white-space: nowrap;
}

.fallbackContainer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  text-align: center;
  background-color: #1a2230;
}

.fallbackSvg {
  max-height: 260px;
  margin-bottom: var(--space-4);
}

.fallbackNotice {
  max-width: 380px;
  font-size: var(--text-label-sm);
  color: var(--color-text-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}
`;

const eduCss = `.section {
  position: relative;
  padding: var(--space-24) 0 var(--space-20);
  background-color: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border-subtle);
  overflow: hidden;
  scroll-margin-top: 90px;
}

.header {
  text-align: center;
  max-width: 780px;
  margin: 0 auto var(--space-8);
}

.tagWrapper {
  margin-bottom: var(--space-3);
  display: flex;
  justify-content: center;
}

.sectionTitle {
  font-family: var(--font-display, sans-serif);
  font-size: clamp(var(--text-h3), 4vw, var(--text-h1));
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.highlight {
  color: var(--color-amber);
}

.sectionDesc {
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* Exercise Navigation Tabs - Clean standalone row with generous clearance */
.exerciseNav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  margin-bottom: var(--space-8);
  position: relative;
  z-index: 10;
}

.exerciseTab {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-full);
  font-family: var(--font-display, sans-serif);
  font-size: var(--text-label-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition:
    background-color var(--dur-fast) var(--ease-sharp),
    border-color var(--dur-fast) var(--ease-sharp),
    color var(--dur-fast) var(--ease-sharp);
}

.exerciseTab:hover {
  background-color: var(--color-bg-elevated);
  border-color: var(--color-border-medium);
  color: var(--color-text-primary);
}

.exerciseTabActive {
  background-color: var(--color-bg-elevated);
  border-color: var(--color-amber);
  color: var(--color-amber);
  box-shadow: 0 0 12px rgba(245, 166, 35, 0.15);
}

.tabIcon {
  color: inherit;
}

/* Main Container Grid */
.interactiveContainer {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
  align-items: stretch;
  position: relative;
  z-index: 1;
}

@media (min-width: 1024px) {
  .interactiveContainer {
    grid-template-columns: 1.35fr 0.65fr;
    gap: var(--space-8);
  }
}

.stage {
  position: relative;
  display: flex;
  flex-direction: column;
}

.viewerLoading {
  width: 100%;
  height: 560px;
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
}

.loadingSpinner {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  border: 2px solid var(--color-border-subtle);
  border-top-color: var(--color-amber);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loadingText {
  font-family: var(--font-mono, monospace);
  font-size: var(--text-tele-xs);
  color: var(--color-text-secondary);
  letter-spacing: var(--tracking-wider);
}

/* Sidebar */
.sidebar {
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

.sidebarHeader {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border-subtle);
}

.sidebarIcon {
  color: var(--color-amber);
  margin-top: 2px;
  flex-shrink: 0;
}

.sidebarTitle {
  font-family: var(--font-display, sans-serif);
  font-size: var(--text-h4);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: 2px;
}

.sidebarCategory {
  font-family: var(--font-mono, monospace);
  font-size: var(--text-tele-xs);
  color: var(--color-text-muted);
}

/* Muscle Breakdown Section */
.muscleSection {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-5);
}

.muscleGroupBlock {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.groupLabel {
  font-family: var(--font-mono, monospace);
  font-size: var(--text-tele-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
  letter-spacing: var(--tracking-wider);
}

.chipRow {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.muscleChip {
  display: inline-flex;
  align-items: center;
  padding: 3px var(--space-3);
  border-radius: var(--radius-sm);
  font-family: var(--font-display, sans-serif);
  font-size: var(--text-label-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition:
    background-color var(--dur-fast) var(--ease-sharp),
    border-color var(--dur-fast) var(--ease-sharp),
    transform var(--dur-micro) var(--ease-sharp);
}

.muscleChip:active {
  transform: scale(0.96);
}

.chipAmber {
  background-color: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.35);
  color: #fbbf24;
}

.chipAmber:hover, .chipAmber.chipSelected {
  background-color: #f59e0b;
  color: #08090a;
  border-color: #f59e0b;
  font-weight: var(--font-weight-semibold);
}

.chipSteel {
  background-color: rgba(14, 165, 233, 0.12);
  border: 1px solid rgba(14, 165, 233, 0.35);
  color: #38bdf8;
}

.chipSteel:hover, .chipSteel.chipSelected {
  background-color: #0ea5e9;
  color: #08090a;
  border-color: #0ea5e9;
  font-weight: var(--font-weight-semibold);
}

/* Active Muscle Detail Box */
.activeMuscleBox {
  padding: var(--space-3) var(--space-4);
  background-color: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.25);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-4);
}

.activeMuscleHeader {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-mono, monospace);
  font-size: var(--text-tele-xs);
  font-weight: var(--font-weight-semibold);
  color: #fbbf24;
  margin-bottom: 2px;
}

.activeMuscleIcon {
  color: #fbbf24;
}

.activeMuscleCue {
  font-size: var(--text-label-sm);
  color: var(--color-text-secondary);
  line-height: 1.45;
}

/* Readout Panels */
.dataPanel {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
}

.dataRow {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: var(--space-3);
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-sm);
  border-left: 2px solid var(--color-steel);
}

.dataLabel {
  font-family: var(--font-mono, monospace);
  font-size: var(--text-tele-xs);
  color: var(--color-text-muted);
  letter-spacing: var(--tracking-wider);
}

.dataValue {
  font-family: var(--font-display, sans-serif);
  font-size: var(--text-label);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.dataCueBox {
  padding: var(--space-4);
  background-color: rgba(245, 158, 11, 0.04);
  border: 1px solid rgba(245, 158, 11, 0.18);
  border-radius: var(--radius-md);
}

.dataCueHeader {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-mono, monospace);
  font-size: var(--text-tele-xs);
  font-weight: var(--font-weight-semibold);
  color: #fbbf24;
  margin-bottom: var(--space-1);
}

.dataCueIcon {
  color: #fbbf24;
}

.dataCueText {
  font-size: var(--text-label-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.sidebarFooter {
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
}
`;

fs.writeFileSync('app/components/exercise/AnatomyViewer/AnatomyViewer.module.css', viewerCss, 'utf8');
fs.writeFileSync('app/components/marketing/EducationPreview/EducationPreview.module.css', eduCss, 'utf8');
console.log('Styles updated.');
