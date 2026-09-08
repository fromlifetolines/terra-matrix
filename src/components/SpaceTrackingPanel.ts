export interface SatelliteSublayerState {
  all: boolean;
  comms: boolean;
  military: boolean;
  navigation: boolean;
  earth_obs: boolean;
  science: boolean;
}

export class SpaceTrackingPanel {
  private container: HTMLElement;
  private parentElement: HTMLElement;
  private isVisible = false;
  private state: SatelliteSublayerState = {
    all: true,
    comms: true,
    military: true,
    navigation: true,
    earth_obs: true,
    science: true,
  };
  private counts: Record<string, number> = {
    all: 1336,
    comms: 6,
    military: 55,
    navigation: 3,
    earth_obs: 27,
    science: 8,
  };
  private onChange?: (state: SatelliteSublayerState) => void;

  constructor(
    parentElement: HTMLElement,
    onChange?: (state: SatelliteSublayerState) => void
  ) {
    this.parentElement = parentElement;
    this.onChange = onChange;
    this.container = document.createElement('div');
    this.container.className = 'space-tracking-drawer';
    this.parentElement.appendChild(this.container);
    this.render();
  }

  public setCounts(counts: Record<string, number>): void {
    this.counts = { ...this.counts, ...counts };
    this.render();
  }

  public setVisible(visible: boolean): void {
    this.isVisible = visible;
    this.container.style.display = visible ? 'block' : 'none';
  }

  public toggle(): void {
    this.setVisible(!this.isVisible);
  }

  public getState(): SatelliteSublayerState {
    return this.state;
  }

  public render(): void {
    this.container.innerHTML = `
      <div class="space-tracking-card">
        <div class="space-tracking-header">
          <span class="drawer-title">SPACE TRACKING</span>
          <div class="drawer-actions">
            <button class="drawer-btn none-btn" title="Turn all off">NONE</button>
            <button class="drawer-btn close-btn" title="Close">✕</button>
          </div>
        </div>

        <div class="space-tracking-list">
          <label class="tracking-item">
            <div class="toggle-switch">
              <input type="checkbox" id="sat-toggle-all" ${this.state.all ? 'checked' : ''} />
              <span class="switch-slider"></span>
            </div>
            <span class="item-label">ALL SATELLITES</span>
            <span class="item-count">${this.counts.all.toLocaleString()}</span>
          </label>

          <label class="tracking-item">
            <div class="toggle-switch">
              <input type="checkbox" id="sat-toggle-comms" ${this.state.comms ? 'checked' : ''} />
              <span class="switch-slider"></span>
            </div>
            <span class="item-label">STARLINK / COMMS</span>
            <span class="item-count">${this.counts.comms.toLocaleString()}</span>
          </label>

          <label class="tracking-item">
            <div class="toggle-switch">
              <input type="checkbox" id="sat-toggle-military" ${this.state.military ? 'checked' : ''} />
              <span class="switch-slider"></span>
            </div>
            <span class="item-label">MILITARY / INTEL</span>
            <span class="item-count">${this.counts.military.toLocaleString()}</span>
          </label>

          <label class="tracking-item">
            <div class="toggle-switch">
              <input type="checkbox" id="sat-toggle-navigation" ${this.state.navigation ? 'checked' : ''} />
              <span class="switch-slider"></span>
            </div>
            <span class="item-label">GPS / NAVIGATION</span>
            <span class="item-count">${this.counts.navigation.toLocaleString()}</span>
          </label>

          <label class="tracking-item">
            <div class="toggle-switch">
              <input type="checkbox" id="sat-toggle-earth" ${this.state.earth_obs ? 'checked' : ''} />
              <span class="switch-slider"></span>
            </div>
            <span class="item-label">EARTH OBSERVATION</span>
            <span class="item-count">${this.counts.earth_obs.toLocaleString()}</span>
          </label>

          <label class="tracking-item">
            <div class="toggle-switch">
              <input type="checkbox" id="sat-toggle-science" ${this.state.science ? 'checked' : ''} />
              <span class="switch-slider"></span>
            </div>
            <span class="item-label">STATIONS / TELESCOPES</span>
            <span class="item-count">${this.counts.science.toLocaleString()}</span>
          </label>
        </div>
      </div>
    `;

    // Close button
    const closeBtn = this.container.querySelector('.close-btn');
    closeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.setVisible(false);
    });

    // None button
    const noneBtn = this.container.querySelector('.none-btn');
    noneBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.state = {
        all: false,
        comms: false,
        military: false,
        navigation: false,
        earth_obs: false,
        science: false,
      };
      this.render();
      this.onChange?.(this.state);
    });

    // Toggle listeners
    const bindToggle = (id: string, key: keyof SatelliteSublayerState) => {
      const input = this.container.querySelector<HTMLInputElement>(`#${id}`);
      input?.addEventListener('change', () => {
        this.state[key] = input.checked;
        if (key === 'all') {
          // If 'all' checked, check all
          const val = input.checked;
          this.state.comms = val;
          this.state.military = val;
          this.state.navigation = val;
          this.state.earth_obs = val;
          this.state.science = val;
          this.render();
        } else {
          // If all sub-toggles on, set all = true, else false
          this.state.all =
            this.state.comms &&
            this.state.military &&
            this.state.navigation &&
            this.state.earth_obs &&
            this.state.science;
          const allInput = this.container.querySelector<HTMLInputElement>('#sat-toggle-all');
          if (allInput) allInput.checked = this.state.all;
        }
        this.onChange?.(this.state);
      });
    };

    bindToggle('sat-toggle-all', 'all');
    bindToggle('sat-toggle-comms', 'comms');
    bindToggle('sat-toggle-military', 'military');
    bindToggle('sat-toggle-navigation', 'navigation');
    bindToggle('sat-toggle-earth', 'earth_obs');
    bindToggle('sat-toggle-science', 'science');
  }

  public destroy(): void {
    this.container.remove();
  }
}
