<template>
  <header class="fixed top-0 left-0 right-0 bg-background/50 backdrop-blur-md z-10">
    <LayoutContainer>
      <nav class="h-[var(--header-height)] flex justify-between items-center">
        <NuxtLink to="/">
          <img src="@/assets/images/logo.svg" alt="Logo" class="h-7">
        </NuxtLink>
<!--        <Button variant="outline" size="sm">Need help?</Button>-->
      </nav>
    </LayoutContainer>
  </header>
</template>