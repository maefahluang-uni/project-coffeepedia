<template >
  <div><v-divider></v-divider></div>
  <v-row class="d-flex justify-space-evenly">
    <div>
      <v-card 
        class="my-12"
        max-width="300"
        max-height="600"
        color="rgba(60, 60, 60, 0.2)"
      >
        <v-img cover height="300" src="@/assets/news1.jpg"></v-img>

        <v-card-item>
          <v-card-subtitle class="ml-4"> July 15, 2023 </v-card-subtitle>
          <v-card-text>
            <div class="text-h6">
              Point out the direction in which the Thai coffee industry can
              develop and be sustainable
            </div>
          </v-card-text>
        </v-card-item>
        <div class="d-flex justify-end">
          <v-btn variant="plain" size="large">
            <v-icon icon="mdi-pencil" color="black" ></v-icon>
          </v-btn>
          <v-btn variant="plain" size="large">
            <v-icon icon="mdi-delete" color="black"></v-icon>
          </v-btn>
        </div>
      </v-card>
    </div>

    <div>
      <v-card 
      
        class="mx-auto my-12"
        max-width="300"
        color="rgba(60, 60, 60, 0.2)"
      >
        <v-img cover height="300" src="@/assets/news3.jpg"></v-img>

        <v-card-item>
          <v-card-subtitle class="ml-4"> July 11, 2023 </v-card-subtitle>
          <v-card-text>
            <div class="text-h6">
              Thai people consume 70,000 tons of coffee per year, pushing the
              market value to reach 60 billion
            </div>
          </v-card-text>
        </v-card-item>
        <div class="d-flex justify-end">
          <v-btn variant="plain" size="large">
            <v-icon icon="mdi-pencil" color="black" ></v-icon>
          </v-btn>
          <v-btn variant="plain" size="large">
            <v-icon icon="mdi-delete" color="black"></v-icon>
          </v-btn>
        </div>
      </v-card>
    </div>
  </v-row>
  <v-row class="d-flex justify-space-evenly">
    <div>
      <v-card
        class="my-12"
        max-width="300"
        max-height="600"
        color="rgba(60, 60, 60, 0.2)"
      >
        <v-img cover height="300" src="@/assets/news2.jpg"></v-img>

        <v-card-item>
          <v-card-subtitle class="ml-4"> Jan 15, 2023 </v-card-subtitle>
          <v-card-text>
            <div class="text-h6">
              Revealing the reason why Thai people drink expensive 'coffee'
            </div>
          </v-card-text>
        </v-card-item>
        <v-spacer></v-spacer>
        <div class="d-flex justify-end">
          <v-btn variant="plain" size="large">
            <v-icon icon="mdi-pencil" color="black"></v-icon>
          </v-btn>
          <v-btn variant="plain" size="large">
            <v-icon icon="mdi-delete" color="black"></v-icon>
          </v-btn>
        </div>
      </v-card>
    </div>

    <div>
      <v-card
        class="mx-auto my-12"
        max-width="300"
        color="rgba(60, 60, 60, 0.2)"
      >
        <v-img cover height="300" src="@/assets/news4.jpg"></v-img>

        <v-card-item>
          <v-card-subtitle class="ml-4"> Dec 10, 2022 </v-card-subtitle>
          <v-card-text>
            <div class="text-h6">
              Get to know espresso A menu that is more than just black coffee.
            </div>
          </v-card-text>
        </v-card-item>
        <div class="d-flex justify-end">
          <v-btn variant="plain" size="large">
            <v-icon icon="mdi-pencil" color="black"></v-icon>
          </v-btn>
          <v-btn variant="plain" size="large">
            <v-icon icon="mdi-delete" color="black"></v-icon>
          </v-btn>
        </div>
      </v-card>
    </div>
  </v-row>
</template>
