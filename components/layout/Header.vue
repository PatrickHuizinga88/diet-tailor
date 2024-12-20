<template>
  <header class="fixed top-0 left-0 right-0 bg-background/50 backdrop-blur-md">
    <LayoutContainer>
      <nav class="h-[var(--header-height)] flex justify-between items-center">
        <NuxtLink to="/">
          <div class="size-10 bg-primary rounded-xl"></div>
<!--          <img src="../assets/images/logo.svg" alt="Logo" class="h-9">-->
        </NuxtLink>
        <Button variant="outline" size="sm">Need help?</Button>
      </nav>
    </LayoutContainer>
  </header>
</template>