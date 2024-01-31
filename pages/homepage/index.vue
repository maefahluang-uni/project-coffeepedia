<template>
    <div class="d-flex mb-4">
        
            <v-img height="50" src="@/assets/blackloco1.png" class="ma-2 " />
            <v-img height="30" src="@/assets/blackloco2.png" class="ma-2 mr-2" />
        
    </div>
    <div>
        <v-divider color="brown"> </v-divider>
        <v-card>
            <v-tabs v-model="tab" color="rgb(240, 200, 165)" align-tabs="center">
                <v-tab :value="1">Home</v-tab>
                <v-tab :value="2">Type coffee beans</v-tab>
                <v-tab :value="3">Blog</v-tab>
                <v-tab :value="4">News</v-tab>
                <v-tab :value="5">Contact</v-tab>
            </v-tabs>
        </v-card>
    </div>
    <div>
        <v-col>
            <v-card title="Location" subtitle="Coffee bean locations in the North" class="mx-auto" max-width="1440"
                color="rgba(240, 200, 80, 0.2)">
                <v-img height="200" src="@/assets/location.gif" />
                <v-card-actions>
                    <v-col cols="4" sm="6" md="4">
                        <v-btn variant="tonal" block rounded="xl">View All</v-btn>
                    </v-col>
                </v-card-actions>

            </v-card>
        </v-col>
    </div>
</template>

<script>
export default {
    data: () => ({
        tab: null,
    }),
}
</script>