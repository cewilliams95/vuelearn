<template>
    <div>
        <h3>Some User Details</h3>
        <p>User loaded has ID: {{ $route.params.id }}</p>
        <router-link tag="button" 
        :to="{
            name: 'userEdit', 
            params: { id: $route.params.id },
            query: { q: 100, locale: 'en'}
            }" 
        class="btn btn-primary">
        Edit
        </router-link>
    </div>
</template>