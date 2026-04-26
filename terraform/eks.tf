module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.21"

  cluster_name    = "devsecops-cluster"
  cluster_version = "1.28"

  vpc_id                         = module.vpc.vpc_id
  subnet_ids                     = module.vpc.private_subnets
  cluster_endpoint_public_access = true

  eks_managed_node_groups = {
    main = {
      min_size     = 1
      max_size     = 1
      desired_size = 1

      instance_types = ["t3.micro"]
      ami_type       = "AL2_x86_64"
      capacity_type  = "ON_DEMAND"
    }
  }
}