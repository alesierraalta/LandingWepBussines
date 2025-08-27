<template>
  <div class="ux-ui-improvement-system">
    <!-- Enhanced Navigation with Breadcrumbs -->
    <NavigationMenu class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container flex h-16 items-center justify-between">
        <!-- Breadcrumb Navigation -->
        <Breadcrumb class="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem v-for="(item, index) in breadcrumbItems" :key="index">
              <BreadcrumbLink 
                :href="item.href" 
                :class="item.current ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground transition-colors duration-200'"
                @click="navigateWithBreadcrumbs(item)"
              >
                {{ item.label }}
              </BreadcrumbLink>
              <BreadcrumbSeparator v-if="index < breadcrumbItems.length - 1" />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <!-- Main Navigation -->
        <NavigationMenuList class="hidden md:flex">
          <NavigationMenuItem v-for="item in navigationItems" :key="item.id">
            <NavigationMenuTrigger 
              :class="[
                'transition-all duration-200 ease-out',
                item.active ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'
              ]"
              @click="setActiveNavigation(item.id)"
            >
              <component :is="item.icon" class="mr-2 h-4 w-4" />
              {{ item.label }}
            </NavigationMenuTrigger>
            <NavigationMenuContent v-if="item.children">
              <div class="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                <div v-for="child in item.children" :key="child.id" class="group">
                  <NavigationMenuLink 
                    :href="child.href"
                    class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                  >
                    <div class="text-sm font-medium leading-none group-hover:text-primary transition-colors duration-200">
                      {{ child.title }}
                    </div>
                    <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      {{ child.description }}
                    </p>
                  </NavigationMenuLink>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>

        <!-- Mobile Navigation Toggle -->
        <Button 
          variant="ghost" 
          size="sm" 
          class="md:hidden"
          @click="toggleMobileMenu"
          :aria-expanded="mobileMenuOpen"
          aria-label="Toggle navigation menu"
        >
          <Menu v-if="!mobileMenuOpen" class="h-5 w-5" />
          <X v-else class="h-5 w-5" />
        </Button>
      </div>

      <!-- Mobile Navigation Menu -->
      <div 
        v-if="mobileMenuOpen" 
        class="md:hidden border-t bg-background/95 backdrop-blur animate-in slide-in-from-top-2 duration-200"
      >
        <div class="container py-4 space-y-2">
          <Button 
            v-for="item in navigationItems" 
            :key="item.id"
            variant="ghost" 
            class="w-full justify-start"
            @click="setActiveNavigation(item.id)"
          >
            <component :is="item.icon" class="mr-2 h-4 w-4" />
            {{ item.label }}
          </Button>
        </div>
      </div>
    </NavigationMenu>

    <!-- Main Content Area with Loading States -->
    <main class="container mx-auto py-8 space-y-8">
      <!-- Loading Skeleton Demo -->
      <Card class="p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-semibold">Content Loading States</h2>
          <Button @click="toggleLoadingState" variant="outline" size="sm">
            {{ isLoading ? 'Stop Loading' : 'Show Loading' }}
          </Button>
        </div>
        
        <div v-if="isLoading" class="space-y-4">
          <Skeleton class="h-4 w-3/4" />
          <Skeleton class="h-4 w-1/2" />
          <Skeleton class="h-32 w-full" />
          <div class="flex space-x-2">
            <Skeleton class="h-10 w-20" />
            <Skeleton class="h-10 w-20" />
          </div>
        </div>
        
        <div v-else class="space-y-4">
          <p class="text-muted-foreground">This is the actual content that appears after loading.</p>
          <div class="bg-muted/50 p-4 rounded-lg">
            <h3 class="font-medium mb-2">Sample Content</h3>
            <p class="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div class="flex space-x-2">
            <Button size="sm">Primary Action</Button>
            <Button variant="outline" size="sm">Secondary Action</Button>
          </div>
        </div>
      </Card>

      <!-- Progress Indicators -->
      <Card class="p-6">
        <h2 class="text-2xl font-semibold mb-4">Progress Indicators</h2>
        <div class="space-y-6">
          <div>
            <div class="flex justify-between text-sm mb-2">
              <span>Upload Progress</span>
              <span>{{ uploadProgress }}%</span>
            </div>
            <Progress :value="uploadProgress" class="w-full" />
          </div>
          
          <div>
            <div class="flex justify-between text-sm mb-2">
              <span>Performance Score</span>
              <span>{{ performanceScore }}/100</span>
            </div>
            <Progress :value="performanceScore" class="w-full" />
          </div>
          
          <Button @click="simulateProgress" :disabled="isProgressing" class="w-full">
            {{ isProgressing ? 'Processing...' : 'Start Process' }}
          </Button>
        </div>
      </Card>

      <!-- Enhanced Form with Validation -->
      <Card class="p-6">
        <h2 class="text-2xl font-semibold mb-4">Form with Real-time Validation</h2>
        <form @submit.prevent="handleFormSubmit" class="space-y-4">
          <div class="space-y-2">
            <Label for="email">Email Address</Label>
            <Input 
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="Enter your email"
              :class="emailError ? 'border-destructive focus-visible:ring-destructive' : ''"
              @blur="validateEmail"
              @input="clearEmailError"
            />
            <div class="flex justify-between text-xs">
              <span v-if="emailError" class="text-destructive">{{ emailError }}</span>
              <span class="text-muted-foreground ml-auto">{{ formData.email.length }}/100</span>
            </div>
          </div>
          
          <div class="space-y-2">
            <Label for="message">Message</Label>
            <Textarea 
              id="message"
              v-model="formData.message"
              placeholder="Enter your message"
              rows="4"
              :class="messageError ? 'border-destructive focus-visible:ring-destructive' : ''"
              @blur="validateMessage"
              @input="clearMessageError"
            />
            <div class="flex justify-between text-xs">
              <span v-if="messageError" class="text-destructive">{{ messageError }}</span>
              <span class="text-muted-foreground ml-auto">{{ formData.message.length }}/500</span>
            </div>
          </div>
          
          <Button 
            type="submit" 
            :disabled="isSubmitting || !isFormValid"
            class="w-full transition-all duration-200"
          >
            <Loader2 v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
            {{ isSubmitting ? 'Submitting...' : 'Submit Form' }}
          </Button>
        </form>
      </Card>

      <!-- Interactive Cards with Tooltips -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card 
          v-for="service in services" 
          :key="service.id"
          class="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-2 hover:border-primary/20"
          @click="selectService(service.id)"
        >
          <CardHeader class="pb-3">
            <div class="flex items-center justify-between">
              <Badge :variant="service.status === 'active' ? 'default' : 'secondary'">
                {{ service.status }}
              </Badge>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" class="h-8 w-8 p-0">
                    <Info class="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p class="max-w-xs">{{ service.tooltip }}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <CardTitle class="group-hover:text-primary transition-colors duration-200">
              {{ service.title }}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground text-sm mb-4">{{ service.description }}</p>
            <div class="flex items-center justify-between">
              <span class="text-2xl font-bold">${{ service.price }}</span>
              <Button size="sm" variant="outline">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Alert Examples -->
      <div class="space-y-4">
        <Alert>
          <Terminal class="h-4 w-4" />
          <AlertTitle>System Update</AlertTitle>
          <AlertDescription>
            Your hosting environment has been successfully updated to the latest version.
          </AlertDescription>
        </Alert>
        
        <Alert variant="destructive" v-if="showErrorAlert">
          <AlertCircle class="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was a problem processing your request. Please try again.
            <Button variant="outline" size="sm" class="mt-2" @click="dismissError">
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    </main>

    <!-- Toast Notifications -->
    <Toaster />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toast'
import { useToast } from '@/components/ui/toast/use-toast'
import {
  Menu,
  X,
  Home,
  Server,
  Settings,
  HelpCircle,
  Info,
  Terminal,
  AlertCircle,
  Loader2,
} from 'lucide-vue-next'

// Props & Events
interface Props {
  initialBreadcrumbs?: BreadcrumbItem[]
  showMobileMenu?: boolean
}

interface BreadcrumbItem {
  label: string
  href: string
  current?: boolean
}

interface NavigationItem {
  id: string
  label: string
  icon: any
  active: boolean
  children?: {
    id: string
    title: string
    description: string
    href: string
  }[]
}

interface Service {
  id: string
  title: string
  description: string
  price: number
  status: 'active' | 'inactive'
  tooltip: string
}

const props = withDefaults(defineProps<Props>(), {
  showMobileMenu: false
})

const emit = defineEmits<{
  navigate: [item: BreadcrumbItem]
  serviceSelect: [serviceId: string]
  formSubmit: [data: any]
}>()

// Composables
const { toast } = useToast()

// Reactive State
const mobileMenuOpen = ref(false)
const isLoading = ref(false)
const uploadProgress = ref(0)
const performanceScore = ref(85)
const isProgressing = ref(false)
const isSubmitting = ref(false)
const showErrorAlert = ref(true)

// Form State
const formData = ref({
  email: '',
  message: ''
})
const emailError = ref('')
const messageError = ref('')

// Mock Data
const breadcrumbItems = ref<BreadcrumbItem[]>([
  { label: 'Home', href: '/' },
  { label: 'Hosting', href: '/hosting' },
  { label: 'Dashboard', href: '/dashboard', current: true }
])

const navigationItems = ref<NavigationItem[]>([
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    active: true,
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        description: 'Overview of your hosting services',
        href: '/dashboard'
      },
      {
        id: 'analytics',
        title: 'Analytics',
        description: 'Performance metrics and insights',
        href: '/analytics'
      }
    ]
  },
  {
    id: 'hosting',
    label: 'Hosting',
    icon: Server,
    active: false,
    children: [
      {
        id: 'shared',
        title: 'Shared Hosting',
        description: 'Affordable hosting for small websites',
        href: '/hosting/shared'
      },
      {
        id: 'vps',
        title: 'VPS Hosting',
        description: 'Virtual private servers for more control',
        href: '/hosting/vps'
      }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    active: false
  },
  {
    id: 'support',
    label: 'Support',
    icon: HelpCircle,
    active: false
  }
])

const services = ref<Service[]>([
  {
    id: '1',
    title: 'Shared Hosting',
    description: 'Perfect for small websites and blogs with reliable performance.',
    price: 9.99,
    status: 'active',
    tooltip: 'Includes 10GB storage, unlimited bandwidth, and 24/7 support'
  },
  {
    id: '2',
    title: 'VPS Hosting',
    description: 'Scalable virtual private servers for growing businesses.',
    price: 29.99,
    status: 'active',
    tooltip: 'Dedicated resources, root access, and custom configurations'
  },
  {
    id: '3',
    title: 'Dedicated Server',
    description: 'Full server control for high-traffic applications.',
    price: 199.99,
    status: 'inactive',
    tooltip: 'Complete hardware control, maximum performance, and security'
  }
])

// Computed Properties
const isFormValid = computed(() => {
  return formData.value.email.length > 0 && 
         formData.value.message.length > 0 && 
         !emailError.value && 
         !messageError.value
})

// Methods
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const setActiveNavigation = (id: string) => {
  navigationItems.value.forEach(item => {
    item.active = item.id === id
  })
  mobileMenuOpen.value = false
  
  toast({
    title: 'Navigation Updated',
    description: `Switched to ${navigationItems.value.find(item => item.id === id)?.label} section`,
  })
}

const navigateWithBreadcrumbs = (item: BreadcrumbItem) => {
  emit('navigate', item)
  toast({
    title: 'Navigation',
    description: `Navigated to ${item.label}`,
  })
}

const toggleLoadingState = () => {
  isLoading.value = !isLoading.value
}

const simulateProgress = async () => {
  isProgressing.value = true
  uploadProgress.value = 0
  
  const interval = setInterval(() => {
    uploadProgress.value += Math.random() * 15
    if (uploadProgress.value >= 100) {
      uploadProgress.value = 100
      clearInterval(interval)
      isProgressing.value = false
      
      toast({
        title: 'Process Complete',
        description: 'Your operation has been completed successfully.',
      })
    }
  }, 200)
}

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.value.email) {
    emailError.value = 'Email is required'
  } else if (!emailRegex.test(formData.value.email)) {
    emailError.value = 'Please enter a valid email address'
  } else {
    emailError.value = ''
  }
}

const validateMessage = () => {
  if (!formData.value.message) {
    messageError.value = 'Message is required'
  } else if (formData.value.message.length < 10) {
    messageError.value = 'Message must be at least 10 characters'
  } else {
    messageError.value = ''
  }
}

const clearEmailError = () => {
  if (emailError.value) emailError.value = ''
}

const clearMessageError = () => {
  if (messageError.value) messageError.value = ''
}

const handleFormSubmit = async () => {
  validateEmail()
  validateMessage()
  
  if (!isFormValid.value) return
  
  isSubmitting.value = true
  
  // Simulate API call
  setTimeout(() => {
    isSubmitting.value = false
    emit('formSubmit', formData.value)
    
    toast({
      title: 'Form Submitted',
      description: 'Your message has been sent successfully.',
    })
    
    // Reset form
    formData.value = { email: '', message: '' }
  }, 2000)
}

const selectService = (serviceId: string) => {
  emit('serviceSelect', serviceId)
  const service = services.value.find(s => s.id === serviceId)
  
  toast({
    title: 'Service Selected',
    description: `You selected ${service?.title}`,
  })
}

const dismissError = () => {
  showErrorAlert.value = false
}

// Lifecycle
onMounted(() => {
  // Simulate initial loading
  setTimeout(() => {
    toast({
      title: 'Welcome!',
      description: 'UX/UI Improvement System loaded successfully.',
    })
  }, 1000)
})
</script>

<style scoped>
.ux-ui-improvement-system {
  min-height: 100vh;
  background: linear-gradient(to bottom, hsl(var(--background)), hsl(var(--muted)/0.3));
}

/* Enhanced focus states for accessibility */
.focus-visible:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
  border-radius: 4px;
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Enhanced hover effects */
.group:hover .group-hover\:text-primary {
  color: hsl(var(--primary));
}

/* Loading animation optimization */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>