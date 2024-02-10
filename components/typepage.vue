<template>
  <div>
    <v-divider></v-divider>
  </div>
  <div>
    <v-layout style="height: 56px">
      <v-bottom-navigation v-model="value" color="teal">
        <v-btn rounded="xl" color="rgb(140, 115, 70)" height="30" class="mt-5">
          <h4>All</h4>
        </v-btn>
        <v-btn rounded="xl" color="rgb(140, 115, 70)" height="30" class="mt-5">
          <h4>Wet process</h4>
        </v-btn>
        <v-btn rounded="xl" color="rgb(140, 115, 70)" height="30" class="mt-5">
          <h4>Dry process</h4>
        </v-btn>
        <v-btn rounded="xl" color="rgb(140, 115, 70)" height="30" class="mt-5">
          <h4>Honey process</h4>
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </div>
  <div class="justify-space-between mb-6">
    <v-row>
      <p class="mt-10 ml-10">Showing All 9 Results</p>
    
    </v-row>

  </div>

  <v-row class="justify-space-between">
    <v-card
      variant="outlined"
      rounded="xl"
      class="mx-auto mt-10"
      color="rgba(185, 160, 130)"
      width="200"
      height="300"
    >
      <v-hover v-slot="{ isHovering, props }">
        <v-card
          rounded="xl"
          class="mx-auto"
          color="rgba(185, 160, 130, 0.5)"
          width="200"
          height="300"
          v-bind="props"
        >
          <v-img cover src="@/assets/wet_light.png">
            <v-expand-transition>
              <div
                v-if="isHovering"
                class="d-flex transition-fast-in-fast-out bg-grey-darken-2 v-card--reveal"
                style="height: 100%"
              >
                <v-btn color="green" rounded="xl" width="100" height="30">
                  View
                </v-btn>
              </div>
            </v-expand-transition>
          </v-img>

          <v-card-text class="pt-6">
            <div class="text-h5 font-weight-drak text-brown mb-2">
              Wet Process
            </div>

            <div class="font-weight-light text-black mb-2">Light Roasted</div>
          </v-card-text>
        </v-card>
      </v-hover>
    </v-card>

  <v-card
      variant="outlined"
      rounded="xl"
      class="mx-auto mt-10"
      color="rgba(185, 160, 130)"
      width="200"
      height="300"
    >  
    <v-hover v-slot="{ isHovering, props }">
      
      <v-card
        rounded="xl"
        class="mx-auto"
        color="rgba(185, 160, 130, 0.5)"
        width="200"
        height="300"
        v-bind="props"
      >
        <v-img cover src="@/assets/wet_medium.png">
          <v-expand-transition>
            <div
              v-if="isHovering"
              class="d-flex transition-fast-in-fast-out bg-grey-darken-2 v-card--reveal"
              style="height: 100%"
            >
              <v-btn color="green" rounded="xl" width="100" height="30">
                View
              </v-btn>
            </div>
          </v-expand-transition>
        </v-img>

        <v-card-text class="pt-6">
          <div class="text-h5 font-weight-drak text-brown mb-2">
            Wet Process
          </div>

          <div class="font-weight-light text-black mb-2">Medium Roasted</div>
        </v-card-text>
      </v-card>
    </v-hover>
    </v-card>

<v-card
      variant="outlined"
      rounded="xl"
      class="mx-auto mt-10"
      color="rgba(185, 160, 130)"
      width="200"
      height="300"
    >  
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        rounded="xl"
        class="mx-auto"
        color="rgba(185, 160, 130, 0.5)"
        width="200"
        height="300"
        v-bind="props"
      >
        <v-img cover src="@/assets/wet_dark.png">
          <v-expand-transition>
            <div
              v-if="isHovering"
              class="d-flex transition-fast-in-fast-out bg-grey-darken-2 v-card--reveal"
              style="height: 100%"
            >
              <v-btn color="green" rounded="xl" width="100" height="30">
                View
              </v-btn>
            </div>
          </v-expand-transition>
        </v-img>
        <v-card-text class="pt-6">
          <div class="text-h5 font-weight-drak text-brown mb-2">
            Wet Process
          </div>

          <div class="font-weight-light text-black mb-2">Dark Roasted</div>
        </v-card-text>
      </v-card>
    </v-hover>
  </v-card>
  </v-row>

  <v-row class="justify-space-between">
    <v-card
      variant="outlined"
      rounded="xl"
      class="mx-auto mt-10"
      color="rgba(185, 160, 130)"
      width="200"
      height="300"
    >  
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        rounded="xl"
        class="mx-auto"
        color="rgba(185, 160, 130, 0.5)"
        width="200"
        height="300"
        v-bind="props"
      >
        <v-img cover src="@/assets/dry_light.png">
          <v-expand-transition>
            <div
              v-if="isHovering"
              class="d-flex transition-fast-in-fast-out bg-grey-darken-2 v-card--reveal"
              style="height: 100%"
            >
              <v-btn color="green" rounded="xl" width="100" height="30">
                View
              </v-btn>
            </div>
          </v-expand-transition>
        </v-img>

        <v-card-text class="pt-6">
          <div class="text-h5 font-weight-drak text-brown mb-2">
            Dry Process
          </div>

          <div class="font-weight-light text-black mb-2">Light Roasted</div>
        </v-card-text>
      </v-card>
    </v-hover>
    </v-card>

    <v-card
      variant="outlined"
      rounded="xl"
      class="mx-auto mt-10"
      color="rgba(185, 160, 130)"
      width="200"
      height="300"
    >  
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        rounded="xl"
        class="mx-auto"
        color="rgba(185, 160, 130, 0.5)"
        width="200"
        height="300"
        v-bind="props"
      >
        <v-img cover src="@/assets/dry_medium.png">
          <v-expand-transition>
            <div
              v-if="isHovering"
              class="d-flex transition-fast-in-fast-out bg-grey-darken-2 v-card--reveal"
              style="height: 100%"
            >
              <v-btn color="green" rounded="xl" width="100" height="30">
                View
              </v-btn>
            </div>
          </v-expand-transition>
        </v-img>

        <v-card-text class="pt-6">
          <div class="text-h5 font-weight-drak text-brown mb-2">
            Dry Process
          </div>

          <div class="font-weight-light text-black mb-2">Medium Roasted</div>
        </v-card-text>
      </v-card>
    </v-hover>
    </v-card>

    <v-card
      variant="outlined"
      rounded="xl"
      class="mx-auto mt-10"
      color="rgba(185, 160, 130)"
      width="200"
      height="300"
    >  
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        rounded="xl"
        class="mx-auto"
        color="rgba(185, 160, 130, 0.5)"
        width="200"
        height="300"
        v-bind="props"
      >
        <v-img cover src="@/assets/dry_dark.png">
          <v-expand-transition>
            <div
              v-if="isHovering"
              class="d-flex transition-fast-in-fast-out bg-grey-darken-2 v-card--reveal"
              style="height: 100%"
            >
              <v-btn color="green" rounded="xl" width="100" height="30">
                View
              </v-btn>
            </div>
          </v-expand-transition>
        </v-img>

        <v-card-text class="pt-6">
          <div class="text-h5 font-weight-drak text-brown mb-2">
            Dry Process
          </div>

          <div class="font-weight-light text-black mb-2">Dark Roasted</div>
        </v-card-text>
      </v-card>
    </v-hover>
    </v-card>
  </v-row>

  <v-row class="justify-space-between">
    <v-card
      variant="outlined"
      rounded="xl"
      class="mx-auto mt-10"
      color="rgba(185, 160, 130)"
      width="200"
      height="300"
    >  
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        rounded="xl"
        class="mx-auto"
        color="rgba(185, 160, 130, 0.5)"
        width="200"
        height="300"
        v-bind="props"
      >
        <v-img cover src="@/assets/honey_light.png">
          <v-expand-transition>
            <div
              v-if="isHovering"
              class="d-flex transition-fast-in-fast-out bg-grey-darken-2 v-card--reveal"
              style="height: 100%"
            >
              <v-btn color="green" rounded="xl" width="100" height="30">
                View
              </v-btn>
            </div>
          </v-expand-transition>
        </v-img>

        <v-card-text class="pt-6">
          <div class="text-h5 font-weight-drak text-brown mb-2">
            Honey Process
          </div>

          <div class="font-weight-light text-black mb-2">Light Roasted</div>
        </v-card-text>
      </v-card>
    </v-hover>
    </v-card>

    <v-card
      variant="outlined"
      rounded="xl"
      class="mx-auto mt-10"
      color="rgba(185, 160, 130)"
      width="200"
      height="300"
    >  
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        rounded="xl"
        class="mx-auto"
        color="rgba(185, 160, 130, 0.5)"
        width="200"
        height="300"
        v-bind="props"
      >
        <v-img cover src="@/assets/honey_medium.png">
          <v-expand-transition>
            <div
              v-if="isHovering"
              class="d-flex transition-fast-in-fast-out bg-grey-darken-2 v-card--reveal"
              style="height: 100%"
            >
              <v-btn color="green" rounded="xl" width="100" height="30">
                View
              </v-btn>
            </div>
          </v-expand-transition>
        </v-img>

        <v-card-text class="pt-6">
          <div class="text-h5 font-weight-drak text-brown mb-2">
            Honey Process
          </div>

          <div class="font-weight-light text-black mb-2">Medium Roasted</div>
        </v-card-text>
      </v-card>
    </v-hover>
    </v-card>

    <v-card
      variant="outlined"
      rounded="xl"
      class="mx-auto mt-10"
      color="rgba(185, 160, 130)"
      width="200"
      height="300"
    >  
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        rounded="xl"
        class="mx-auto"
        color="rgba(185, 160, 130, 0.5)"
        width="200"
        height="300"
        v-bind="props"
      >
        <v-img cover src="@/assets/honey_dark.png">
          <v-expand-transition>
            <div
              v-if="isHovering"
              class="d-flex transition-fast-in-fast-out bg-grey-darken-2 v-card--reveal"
              style="height: 100%"
            >
              <v-btn color="green" rounded="xl" width="100" height="30">
                View
              </v-btn>
            </div>
          </v-expand-transition>
        </v-img>

        <v-card-text class="pt-6">
          <div class="text-h5 font-weight-drak text-brown mb-2">
            Honey Process
          </div>

          <div class="font-weight-light text-black mb-2">Dark Roasted</div>
        </v-card-text>
      </v-card>
    </v-hover>
    </v-card>
  </v-row>
</template>

<script>
export default {
  data: () => ({ value: 1}),
};
</script>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}
</style>
